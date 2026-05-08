"""Financial action simulations for the LOLO prototype engine."""

from __future__ import annotations

from copy import deepcopy
from typing import Any, Dict

from trust_score import calculate_trust_score


def _result(original: Dict[str, Any], updated: Dict[str, Any], explanation: str) -> Dict[str, Any]:
    before = calculate_trust_score(original)
    after = calculate_trust_score(updated)
    changed = [
        factor
        for factor, score in after["factor_scores"].items()
        if score != before["factor_scores"][factor]
    ]
    return {
        "updated_trust_score": after["trust_score"],
        "score_delta": after["trust_score"] - before["trust_score"],
        "changed_factors": changed,
        "explanation": explanation,
        "score_result": after,
    }


def make_payment(user: Dict[str, Any], amount: float, card_id: str) -> Dict[str, Any]:
    updated = deepcopy(user)
    for card in updated["credit_cards"]:
        if card["id"] == card_id:
            card["balance"] = max(0, round(card["balance"] - amount, 2))
            break
    return _result(
        user,
        updated,
        f"Paying ${round(amount)} toward {card_id} reduces reported revolving balance and can improve utilization control.",
    )


def reduce_category_spending(user: Dict[str, Any], category: str, percent: float) -> Dict[str, Any]:
    updated = deepcopy(user)
    current = updated["variable_spending"].get(category, 0)
    reduction = current * percent / 100
    updated["variable_spending"][category] = round(max(0, current - reduction), 2)
    updated["transaction_categories"]["wants"] = round(max(0, updated["transaction_categories"].get("wants", 0) - reduction), 2)
    updated["transaction_categories"]["savings"] = round(updated["transaction_categories"].get("savings", 0) + reduction, 2)
    return _result(
        user,
        updated,
        f"Reducing {category} by {percent}% redirects about ${round(reduction)} toward savings and improves cash-flow behavior.",
    )


def increase_income(user: Dict[str, Any], amount: float) -> Dict[str, Any]:
    updated = deepcopy(user)
    updated["monthly_income"] = round(updated["monthly_income"] + amount, 2)
    updated["transaction_categories"]["savings"] = round(updated["transaction_categories"].get("savings", 0) + amount * 0.5, 2)
    return _result(
        user,
        updated,
        f"Adding ${round(amount)} of monthly income improves cash-flow stability when at least part of it is preserved.",
    )


def add_emergency_savings(user: Dict[str, Any], amount: float) -> Dict[str, Any]:
    updated = deepcopy(user)
    updated["emergency_savings"] = round(updated["emergency_savings"] + amount, 2)
    return _result(
        user,
        updated,
        f"Adding ${round(amount)} to emergency savings improves runway and reduces stress risk.",
    )


def missed_payment(user: Dict[str, Any]) -> Dict[str, Any]:
    updated = deepcopy(user)
    updated["payment_history"]["late_payments"] += 1
    updated["payment_history"]["months_tracked"] += 1
    return _result(
        user,
        updated,
        "A missed payment materially weakens payment consistency, the highest-weighted LOLO demo factor.",
    )


def new_credit_inquiry(user: Dict[str, Any]) -> Dict[str, Any]:
    updated = deepcopy(user)
    updated["recent_credit_inquiries"] += 1
    return _result(
        user,
        updated,
        "A new credit inquiry lowers the recent-inquiries factor, especially for thin or newer credit files.",
    )
