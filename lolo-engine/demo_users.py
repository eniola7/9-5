"""Demo user profiles for the LOLO prototype engine.

The data is intentionally realistic enough for investor demos, but every user is
fictional and should not be treated as financial advice or credit bureau data.
"""

from __future__ import annotations

from copy import deepcopy
from typing import Any, Dict, List


DemoUser = Dict[str, Any]


DEMO_USERS: List[DemoUser] = [
    {
        "id": "immigrant-thin-file",
        "name": "Mina A.",
        "persona": "Recent immigrant with thin credit file",
        "monthly_income": 4200,
        "rent": 1450,
        "fixed_expenses": {"utilities": 180, "phone": 55, "transit": 140, "insurance": 90},
        "variable_spending": {"groceries": 430, "dining": 360, "rideshare": 120, "shopping": 180, "travel": 80},
        "credit_cards": [
            {"id": "card-secured", "name": "Secured Builder Visa", "balance": 420, "limit": 1000, "apr": 24.99, "due_in_days": 9},
        ],
        "payment_history": {"on_time_payments": 7, "late_payments": 0, "months_tracked": 7},
        "subscriptions": [
            {"name": "Spotify", "amount": 10.99},
            {"name": "Duolingo", "amount": 12.99},
        ],
        "emergency_savings": 1600,
        "transaction_categories": {"needs": 2315, "wants": 740, "savings": 450, "debt_payments": 95},
        "credit_age_months": 7,
        "recent_credit_inquiries": 1,
        "goals": ["Build U.S. credit", "Qualify for apartment", "Avoid unnecessary inquiries"],
        "last_month": {"variable_spending": 820, "savings": 360, "utilization": 0.35},
    },
    {
        "id": "college-builder",
        "name": "Jordan P.",
        "persona": "College student building credit",
        "monthly_income": 1800,
        "rent": 650,
        "fixed_expenses": {"utilities": 80, "phone": 45, "transit": 60, "insurance": 0},
        "variable_spending": {"groceries": 280, "dining": 220, "rideshare": 95, "shopping": 160, "books": 75},
        "credit_cards": [
            {"id": "card-student", "name": "Student Rewards Card", "balance": 260, "limit": 900, "apr": 25.49, "due_in_days": 12},
        ],
        "payment_history": {"on_time_payments": 14, "late_payments": 0, "months_tracked": 14},
        "subscriptions": [
            {"name": "Apple Music Student", "amount": 5.99},
            {"name": "Notion AI", "amount": 10.00},
        ],
        "emergency_savings": 700,
        "transaction_categories": {"needs": 1115, "wants": 475, "savings": 130, "debt_payments": 60},
        "credit_age_months": 14,
        "recent_credit_inquiries": 0,
        "goals": ["Keep utilization under 30%", "Build emergency savings", "Graduate with good credit habits"],
        "last_month": {"variable_spending": 720, "savings": 100, "utilization": 0.32},
    },
    {
        "id": "early-pro-high-util",
        "name": "Ava R.",
        "persona": "Early professional with stable income but high utilization",
        "monthly_income": 5800,
        "rent": 2050,
        "fixed_expenses": {"utilities": 220, "phone": 70, "transit": 160, "insurance": 145, "student_loan": 184},
        "variable_spending": {"groceries": 520, "dining": 640, "rideshare": 260, "shopping": 410, "fitness": 75},
        "credit_cards": [
            {"id": "card-savor", "name": "SavorOne Starter Rewards", "balance": 1520, "limit": 4000, "apr": 24.49, "due_in_days": 8},
            {"id": "card-travel", "name": "Travel Flex Card", "balance": 680, "limit": 2500, "apr": 27.24, "due_in_days": 17},
        ],
        "payment_history": {"on_time_payments": 32, "late_payments": 0, "months_tracked": 32},
        "subscriptions": [
            {"name": "Spotify", "amount": 10.99},
            {"name": "ClassPass", "amount": 59.00},
            {"name": "HBO Max", "amount": 15.99},
        ],
        "emergency_savings": 8300,
        "transaction_categories": {"needs": 2829, "wants": 1385, "savings": 860, "debt_payments": 390},
        "credit_age_months": 32,
        "recent_credit_inquiries": 1,
        "goals": ["Reduce utilization", "Preserve emergency fund", "Prepare for first apartment renewal"],
        "last_month": {"variable_spending": 1700, "savings": 720, "utilization": 0.42},
    },
    {
        "id": "high-earner-drift",
        "name": "Nia C.",
        "persona": "High earner with spending drift",
        "monthly_income": 11200,
        "rent": 3300,
        "fixed_expenses": {"utilities": 310, "phone": 90, "transit": 80, "insurance": 260, "student_loan": 620},
        "variable_spending": {"groceries": 780, "dining": 1650, "rideshare": 520, "shopping": 1350, "travel": 900},
        "credit_cards": [
            {"id": "card-premium", "name": "Premium Travel Card", "balance": 3100, "limit": 18000, "apr": 22.99, "due_in_days": 5},
            {"id": "card-cashback", "name": "Cash Back Reserve", "balance": 1150, "limit": 9000, "apr": 21.99, "due_in_days": 19},
        ],
        "payment_history": {"on_time_payments": 72, "late_payments": 0, "months_tracked": 72},
        "subscriptions": [
            {"name": "Equinox", "amount": 220.00},
            {"name": "The New York Times", "amount": 25.00},
            {"name": "Dropbox", "amount": 11.99},
        ],
        "emergency_savings": 26000,
        "transaction_categories": {"needs": 4660, "wants": 4420, "savings": 1200, "debt_payments": 920},
        "credit_age_months": 86,
        "recent_credit_inquiries": 2,
        "goals": ["Stop lifestyle drift", "Increase savings rate", "Keep premium cards disciplined"],
        "last_month": {"variable_spending": 4200, "savings": 1900, "utilization": 0.12},
    },
    {
        "id": "responsible-low-income",
        "name": "Sam T.",
        "persona": "Responsible user with low income",
        "monthly_income": 2600,
        "rent": 900,
        "fixed_expenses": {"utilities": 130, "phone": 45, "transit": 95, "insurance": 80},
        "variable_spending": {"groceries": 360, "dining": 120, "rideshare": 45, "shopping": 90, "family_support": 180},
        "credit_cards": [
            {"id": "card-local", "name": "Local Credit Union Card", "balance": 120, "limit": 1800, "apr": 18.99, "due_in_days": 14},
        ],
        "payment_history": {"on_time_payments": 48, "late_payments": 1, "months_tracked": 49},
        "subscriptions": [
            {"name": "Mint Mobile", "amount": 15.00},
            {"name": "Peacock", "amount": 5.99},
        ],
        "emergency_savings": 2400,
        "transaction_categories": {"needs": 1610, "wants": 255, "savings": 260, "debt_payments": 60},
        "credit_age_months": 54,
        "recent_credit_inquiries": 0,
        "goals": ["Maintain stability", "Grow savings slowly", "Avoid high-interest debt"],
        "last_month": {"variable_spending": 780, "savings": 220, "utilization": 0.08},
    },
]


def get_demo_users() -> List[DemoUser]:
    """Return a deep copy so simulations do not mutate the source fixtures."""
    return deepcopy(DEMO_USERS)
