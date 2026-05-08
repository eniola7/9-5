"""Transparent LOLO Trust Score model.

This is a demo educational score from 300 to 850. It is not a FICO score, VantageScore,
credit bureau score, lending decision, or financial advice.
"""

from __future__ import annotations

from typing import Any, Dict


DISCLAIMER = (
    "LOLO Trust Score is a demo educational score for product prototyping. "
    "It is not a real credit score, FICO score, VantageScore, underwriting model, "
    "or financial advice."
)

WEIGHTS = {
    "payment_consistency": 0.20,
    "utilization_control": 0.18,
    "cash_flow_stability": 0.14,
    "emergency_runway": 0.12,
    "spending_drift": 0.10,
    "debt_pressure": 0.09,
    "behavior_trend": 0.07,
    "credit_age": 0.06,
    "recent_inquiries": 0.04,
}


def clamp(value: float, low: float = 0, high: float = 100) -> float:
    return max(low, min(high, value))


def monthly_fixed_total(user: Dict[str, Any]) -> float:
    return user["rent"] + sum(user["fixed_expenses"].values())


def variable_total(user: Dict[str, Any]) -> float:
    return sum(user["variable_spending"].values())


def card_totals(user: Dict[str, Any]) -> Dict[str, float]:
    balance = sum(card["balance"] for card in user["credit_cards"])
    limit = sum(card["limit"] for card in user["credit_cards"])
    utilization = balance / limit if limit else 0
    return {"balance": balance, "limit": limit, "utilization": utilization}


def calculate_factor_scores(user: Dict[str, Any]) -> Dict[str, int]:
    payments = user["payment_history"]
    late_rate = payments["late_payments"] / max(1, payments["months_tracked"])
    payment_consistency = clamp(100 - late_rate * 320)

    cards = card_totals(user)
    utilization = cards["utilization"]
    if utilization <= 0.1:
      utilization_control = 96
    elif utilization <= 0.3:
      utilization_control = 86 - (utilization - 0.1) * 80
    elif utilization <= 0.5:
      utilization_control = 70 - (utilization - 0.3) * 120
    else:
      utilization_control = 45 - (utilization - 0.5) * 70
    utilization_control = clamp(utilization_control)

    income = user["monthly_income"]
    fixed = monthly_fixed_total(user)
    variable = variable_total(user)
    debt_payments = user["transaction_categories"].get("debt_payments", 0)
    free_cash = income - fixed - variable - debt_payments
    savings_rate = free_cash / income if income else 0
    cash_flow_stability = clamp(55 + savings_rate * 220)

    essential_monthly = fixed + user["transaction_categories"].get("needs", 0) * 0.25
    runway_months = user["emergency_savings"] / max(1, essential_monthly)
    emergency_runway = clamp(runway_months / 4 * 100)

    last_variable = user["last_month"]["variable_spending"]
    drift = (variable - last_variable) / max(1, last_variable)
    spending_drift = clamp(82 - max(0, drift) * 130 + max(0, -drift) * 40)

    debt_ratio = (cards["balance"] + debt_payments * 3) / max(1, income)
    debt_pressure = clamp(92 - debt_ratio * 75)

    current_savings = user["transaction_categories"].get("savings", 0)
    prior_savings = user["last_month"].get("savings", current_savings)
    savings_change = (current_savings - prior_savings) / max(1, prior_savings)
    util_change = user["last_month"].get("utilization", utilization) - utilization
    behavior_trend = clamp(72 + savings_change * 40 + util_change * 70 - max(0, drift) * 45)

    credit_age = clamp((user["credit_age_months"] / 84) * 100)

    recent_inquiries = clamp(100 - user["recent_credit_inquiries"] * 22)

    return {
        "payment_consistency": round(payment_consistency),
        "utilization_control": round(utilization_control),
        "cash_flow_stability": round(cash_flow_stability),
        "emergency_runway": round(emergency_runway),
        "spending_drift": round(spending_drift),
        "debt_pressure": round(debt_pressure),
        "behavior_trend": round(behavior_trend),
        "credit_age": round(credit_age),
        "recent_inquiries": round(recent_inquiries),
    }


def calculate_trust_score(user: Dict[str, Any]) -> Dict[str, Any]:
    factors = calculate_factor_scores(user)
    weighted_0_to_100 = sum(factors[name] * WEIGHTS[name] for name in WEIGHTS)
    total_score = round(300 + weighted_0_to_100 * 5.5)

    weighted_breakdown = {
        name: {
            "factor_score": factors[name],
            "weight": WEIGHTS[name],
            "weighted_points": round(factors[name] * WEIGHTS[name], 2),
        }
        for name in WEIGHTS
    }

    low_factor = min(factors, key=factors.get)
    high_factor = max(factors, key=factors.get)
    cards = card_totals(user)
    variable = variable_total(user)
    prior_variable = user["last_month"]["variable_spending"]
    utilization_delta = user["last_month"]["utilization"] - cards["utilization"]

    changed = []
    if utilization_delta > 0.03:
        changed.append("Utilization improved versus last month.")
    elif utilization_delta < -0.03:
        changed.append("Utilization increased versus last month.")
    if variable > prior_variable * 1.1:
        changed.append("Variable spending drifted upward this month.")
    if user["transaction_categories"].get("savings", 0) > user["last_month"].get("savings", 0):
        changed.append("Savings contribution increased this month.")
    if not changed:
        changed.append("Core behavior stayed stable this month.")

    upside = estimate_upside(user, factors)

    return {
        "user_id": user["id"],
        "trust_score": max(300, min(850, total_score)),
        "factor_scores": factors,
        "weighted_breakdown": weighted_breakdown,
        "what_changed_this_month": changed,
        "top_risk": humanize_factor(low_factor),
        "top_strength": humanize_factor(high_factor),
        "possible_upside_this_month": upside,
        "disclaimer": DISCLAIMER,
    }


def estimate_upside(user: Dict[str, Any], factors: Dict[str, int]) -> Dict[str, Any]:
    cards = sorted(user["credit_cards"], key=lambda card: card["balance"] / card["limit"], reverse=True)
    top_card = cards[0]
    target_balance = top_card["limit"] * 0.3
    payment_to_30 = max(0, round(top_card["balance"] - target_balance))
    utilization_gap = max(0, 82 - factors["utilization_control"])
    cash_gap = max(0, 78 - factors["cash_flow_stability"])
    possible_points = round((utilization_gap * WEIGHTS["utilization_control"] + cash_gap * WEIGHTS["cash_flow_stability"]) * 5.5)
    return {
        "points": max(4, possible_points),
        "action": f"Pay ${payment_to_30} toward {top_card['name']} before statement close" if payment_to_30 else "Keep balances low through statement close",
        "reason": "Upside is based on utilization and cash-flow factors in the demo model.",
    }


def humanize_factor(factor: str) -> str:
    return factor.replace("_", " ").title()
