"""Export LOLO prototype engine data to sample_output.json."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict, List

from demo_users import get_demo_users
from recommendations import generate_recommendations
from simulations import (
    add_emergency_savings,
    increase_income,
    make_payment,
    missed_payment,
    new_credit_inquiry,
    reduce_category_spending,
)
from trust_score import DISCLAIMER, calculate_trust_score, card_totals, monthly_fixed_total, variable_total


OUTPUT_PATH = Path(__file__).with_name("sample_output.json")


def dashboard_ready(user: Dict[str, Any], score: Dict[str, Any], recommendations: List[Dict[str, Any]]) -> Dict[str, Any]:
    cards = card_totals(user)
    fixed = monthly_fixed_total(user)
    variable = variable_total(user)
    debt_payments = user["transaction_categories"].get("debt_payments", 0)
    cash_flow = user["monthly_income"] - fixed - variable - debt_payments
    essential = fixed + user["transaction_categories"].get("needs", 0) * 0.25
    runway = user["emergency_savings"] / max(1, essential)
    top_card = max(user["credit_cards"], key=lambda card: card["balance"] / card["limit"])

    return {
        "user_id": user["id"],
        "display_name": user["name"],
        "persona": user["persona"],
        "trust_score": score["trust_score"],
        "top_risk": score["top_risk"],
        "top_strength": score["top_strength"],
        "monthly_cash_flow": round(cash_flow, 2),
        "utilization_percent": round(cards["utilization"] * 100, 1),
        "emergency_runway_months": round(runway, 1),
        "spending_drift_percent": round(((variable - user["last_month"]["variable_spending"]) / max(1, user["last_month"]["variable_spending"])) * 100, 1),
        "next_best_action": recommendations[0] if recommendations else None,
        "hero_cards": [
            {"label": "Trust Score", "value": score["trust_score"], "detail": score["possible_upside_this_month"]},
            {"label": "Cash Flow", "value": round(cash_flow, 2), "detail": "Income minus fixed, variable, and debt payments"},
            {"label": "Utilization", "value": round(cards["utilization"] * 100, 1), "detail": f"Highest card pressure: {top_card['name']}"},
            {"label": "Runway", "value": round(runway, 1), "detail": "Estimated essential-expense months covered"},
        ],
    }


def simulation_examples(user: Dict[str, Any]) -> Dict[str, Any]:
    top_card = max(user["credit_cards"], key=lambda card: card["balance"] / card["limit"])
    return {
        "make_payment": make_payment(user, 320, top_card["id"]),
        "reduce_category_spending": reduce_category_spending(user, "dining", 18),
        "increase_income": increase_income(user, 400),
        "add_emergency_savings": add_emergency_savings(user, 500),
        "missed_payment": missed_payment(user),
        "new_credit_inquiry": new_credit_inquiry(user),
    }


def build_export() -> Dict[str, Any]:
    users = get_demo_users()
    score_results = {}
    recommendation_results = {}
    simulations = {}
    dashboards = []

    for user in users:
        score = calculate_trust_score(user)
        recommendations = generate_recommendations(user)
        score_results[user["id"]] = score
        recommendation_results[user["id"]] = recommendations
        simulations[user["id"]] = simulation_examples(user)
        dashboards.append(dashboard_ready(user, score, recommendations))

    return {
        "metadata": {
            "product": "LOLO",
            "engine": "prototype-demo-engine",
            "version": "0.1.0",
            "disclaimer": DISCLAIMER,
        },
        "demo_users": users,
        "trust_score_results": score_results,
        "recommendations": recommendation_results,
        "simulation_examples": simulations,
        "dashboard_ready_data": dashboards,
    }


def main() -> None:
    payload = build_export()
    OUTPUT_PATH.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Generated {OUTPUT_PATH}")
    print(f"Users: {len(payload['demo_users'])}")


if __name__ == "__main__":
    main()
