# In backend/app/logic.py

# Data from the briefing
COFFEE_DATA = {
    "standard": {
        "name": "Sweetspot Standard",
        "notes": "balanced, caramel, chocolate, Orange, Hazelnut"
    },
    "kenia": {
        "name": "Bluebird Kenia washed Mamuto aa",
        "notes": "Rote Johannisbeeren, Kirschen (Red Currant, Cherries)"
    }
}

PASTRY_DATA = [
    "Banana Bread",
    "Croissant",
    "Franzbrötchen",
    "Pain au Chocolat",
    "Zimtknoten",
    "Kardamomknoten"
]

def simulate_pairing(coffee_id: str):
    """
    Simulates the AI pairing logic based on the sample prompt.
    Returns a JSON structure matching the briefing's example.
    """
    if coffee_id == "standard":
        # This logic mimics the example prompt for the 'Standard' blend
        return {
            "coffee": COFFEE_DATA["standard"]["name"] + " (" + COFFEE_DATA["standard"]["notes"] + ")",
            "pairings": [
                {
                    "pastry": "Franzbrötchen",
                    "reason": "Caramel sweetness mirrors the roasted chocolate notes of the blend.",
                    "image": "/images/franzbrotchen.jpg"
                },
                {
                    "pastry": "Pain au Chocolat",
                    "reason": "The dark chocolate core complements the coffee's balanced body and caramel notes.",
                    "image": "/images/pain-au-chocolat.jpg"
                }
            ]
        }
    
    elif coffee_id == "kenia":
        # This is a new simulated response for the 'Kenia' coffee
        return {
            "coffee": COFFEE_DATA["kenia"]["name"] + " (" + COFFEE_DATA["kenia"]["notes"] + ")",
            "pairings": [
                {
                    "pastry": "Croissant",
                    "reason": "The light, buttery pastry balances the bright, fruity acidity (Red Currant) of the Kenia.",
                    "image": "/images/croissant.jpg"
                },
                {
                    "pastry": "Kardamomknoten",
                    "reason": "The warm Nordic spices provide a pleasant contrast to the coffee's cherry notes.",
                    "image": "/images/kardamomknoten.jpg"
                }
            ]
        }
    
    # Default fallback
    return {"coffee": "Unknown", "pairings": []}