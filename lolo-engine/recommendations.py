"""Next-best-action generation for LOLO demo users."""

from __future__ import annotations

from typing import Any, Dict, List

from trust_score import card_totals, monthly_fixed_total, variable_total


def generate_recommendations(user: Dict[str, Any]) -> List[Dict[str, Any]]:
    recommendations: List[Dict[str, Any]] = []
    cards = card_totals(user)
    utilization = cards["utilization"]

    for card in user["credit_cards"]:
        card_utilization = card["balance"] / card["limit"] if card["limit"] else 0
        target_payment = max(0, round(card["balance"] - card["limit"] * 0.3))
        if card_utilization > 0.3 and target_payment > 0:
            recommendations.append({
                "title": f"Pay ${target_payment} toward {card['name']}",
                "explanation": f"This could bring {card['name']} below 30% utilization before the next statement reports.",
                "estimated_impact": "+8 to +22 LOLO Trust Score points in the demo model",
                "difficulty": "Medium",
                "urgency": "High" if card["due_in_days"] <= 10 else "Medium",
                "category": "Credit utilization",
            })

    dining = user["variable_spending"].get("dining", 0)
    if dining > user["monthly_income"] * 0.08:
        reduction = round(dining * 0.18)
        recommendations.append({
            "title": f"Reduce dining spend by ${reduction}",
            "explanation": "Dining is not bad. It is simply the clearest flexible category affecting runway this month.",
            "estimated_impact": "+3 to +9 points through cash-flow stability",
            "difficulty": "Low",
            "urgency": "Medium",
            "category": "Spending drift",
        })

    if user["recent_credit_inquiries"] > 0:
        recommendations.append({
            "title": "Avoid new credit inquiries this month",
            "explanation": "A quiet month helps thin or rebuilding files look more stable in the LOLO trust layer.",
            "estimated_impact": "Protects recent-inquiry factor",
            "difficulty": "Low",
            "urgency": "Medium",
            "category": "Credit behavior",
        })

    if user["payment_history"]["late_payments"] > 0 or min(card["due_in_days"] for card in user["credit_cards"]) <= 10:
        recommendations.append({
            "title": "Set autopay before the next due date",
            "explanation": "Payment consistency is the highest-weighted factor in the LOLO demo score.",
            "estimated_impact": "Protects up to 20% of weighted score",
            "difficulty": "Low",
            "urgency": "High",
            "category": "Payment consistency",
        })

    essential = monthly_fixed_total(user) + user["transaction_categories"].get("needs", 0) * 0.25
    runway = user["emergency_savings"] / max(1, essential)
    if runway < 3:
        monthly_target = round(max(75, (essential * 3 - user["emergency_savings"]) / 3))
        recommendations.append({
            "title": f"Build emergency savings by ${monthly_target}/mo for 3 months",
            "explanation": "Three months of essential runway gives the trust layer more confidence during rent, job, or income shocks.",
            "estimated_impact": "+5 to +14 points through emergency runway",
            "difficulty": "Medium",
            "urgency": "Medium",
            "category": "Emergency runway",
        })

    if utilization <= 0.3 and runway >= 3 and variable_total(user) < user["monthly_income"] * 0.28:
        recommendations.append({
            "title": "Keep the system boring this month",
            "explanation": "Your profile is already stable. The best next action is to preserve the rhythm and avoid unnecessary changes.",
            "estimated_impact": "Protects current score",
            "difficulty": "Low",
            "urgency": "Low",
            "category": "Behavior trend",
        })

    return recommendations[:5]
