const mockData = {
    "account": {
        "balance": 5000.00
    },
    "campaigns": [
        {
            "id": 1,
            "name": "Summer Shoe Collection",
            "keywords": ["shoes", "summer footwear", "sandals", "beach shoes"],
            "bidAmount": 1.75,
            "campaignFund": 500.00,
            "status": true,
            "town": "Warszawa",
            "radius": 25,
            "dateCreated": "2025-04-15T10:30:00Z"
        },
        {
            "id": 2,
            "name": "Organic Skincare Products",
            "keywords": ["organic skincare", "natural beauty", "vegan cosmetics", "cruelty-free"],
            "bidAmount": 2.50,
            "campaignFund": 750.00,
            "status": true,
            "town": "Kraków",
            "radius": 35,
            "dateCreated": "2025-03-21T08:15:00Z"
        },
        {
            "id": 3,
            "name": "Handmade Jewelry Sale",
            "keywords": ["handmade jewelry", "artisan earrings", "custom necklaces", "gift jewelry"],
            "bidAmount": 1.25,
            "campaignFund": 300.00,
            "status": false,
            "town": "Łódź",
            "radius": 15,
            "dateCreated": "2025-05-01T14:00:00Z"
        },
        {
            "id": 4,
            "name": "Home Office Furniture",
            "keywords": ["home office", "ergonomic desk", "office chair", "standing desk"],
            "bidAmount": 3.00,
            "campaignFund": 1200.00,
            "status": true,
            "town": "Wrocław",
            "radius": 50,
            "dateCreated": "2025-02-10T11:45:00Z"
        },
        {
            "id": 5,
            "name": "Eco-Friendly Kitchen Products",
            "keywords": ["eco kitchen", "sustainable kitchenware", "bamboo utensils", "zero waste"],
            "bidAmount": 1.85,
            "campaignFund": 450.00,
            "status": true,
            "town": "Poznań",
            "radius": 20,
            "dateCreated": "2025-04-28T16:20:00Z"
        },
        {
            "id": 6,
            "name": "Vintage Vinyl Records",
            "keywords": ["vinyl records", "vintage music", "record collection", "classic albums"],
            "bidAmount": 1.30,
            "campaignFund": 250.00,
            "status": false,
            "town": "Gdańsk",
            "radius": 15,
            "dateCreated": "2025-05-10T09:00:00Z"
        },
        {
            "id": 7,
            "name": "Gourmet Coffee Beans",
            "keywords": ["gourmet coffee", "specialty beans", "single origin", "fair trade coffee"],
            "bidAmount": 2.15,
            "campaignFund": 600.00,
            "status": true,
            "town": "Szczecin",
            "radius": 30,
            "dateCreated": "2025-01-15T13:20:00Z"
        },
        {
            "id": 8,
            "name": "Fitness Equipment Sale",
            "keywords": ["home gym", "fitness equipment", "workout gear", "exercise machines"],
            "bidAmount": 2.75,
            "campaignFund": 850.00,
            "status": true,
            "town": "Bydgoszcz",
            "radius": 40,
            "dateCreated": "2025-03-05T10:10:00Z"
        },
        {
            "id": 9,
            "name": "Children's Books Collection",
            "keywords": ["children's books", "kids literature", "bedtime stories", "educational books"],
            "bidAmount": 0.95,
            "campaignFund": 200.00,
            "status": false,
            "town": "Warszawa",
            "radius": 25,
            "dateCreated": "2025-05-12T15:30:00Z"
        },
        {
            "id": 10,
            "name": "Artisan Chocolate",
            "keywords": ["artisan chocolate", "gourmet treats", "handmade confections", "chocolate gifts"],
            "bidAmount": 1.45,
            "campaignFund": 320.00,
            "status": true,
            "town": "Kraków",
            "radius": 15,
            "dateCreated": "2025-04-01T09:45:00Z"
        },
        {
            "id": 11,
            "name": "Smart Home Devices",
            "keywords": ["smart home", "home automation", "smart speakers", "connected devices"],
            "bidAmount": 3.25,
            "campaignFund": 1000.00,
            "status": true,
            "town": "Łódź",
            "radius": 45,
            "dateCreated": "2025-02-20T14:15:00Z"
        },
        {
            "id": 12,
            "name": "Outdoor Camping Gear",
            "keywords": ["camping gear", "outdoor equipment", "hiking supplies", "adventure gear"],
            "bidAmount": 2.20,
            "campaignFund": 550.00,
            "status": false,
            "town": "Wrocław",
            "radius": 60,
            "dateCreated": "2025-03-15T11:30:00Z"
        }
    ],
    "availableTowns": [
        { "name": "Warszawa" },
        { "name": "Kraków" },
        { "name": "Łódź" },
        { "name": "Wrocław" },
        { "name": "Poznań" },
        { "name": "Gdańsk" },
        { "name": "Szczecin" },
        { "name": "Bydgoszcz" },
        { "name": "Lublin" },
        { "name": "Katowice" },
        { "name": "Gdynia" },
        { "name": "Częstochowa" },
        { "name": "Radom" },
        { "name": "Białystok" },
        { "name": "Toruń" },
        { "name": "Sosnowiec" },
        { "name": "Rzeszów" },
        { "name": "Kielce" },
        { "name": "Gliwice" },
        { "name": "Zabrze" }
    ],
    "availableKeywords": [
        "shoes", "summer footwear", "sandals", "beach shoes",
        "organic skincare", "natural beauty", "vegan cosmetics", "cruelty-free",
        "handmade jewelry", "artisan earrings", "custom necklaces", "gift jewelry",
        "home office", "ergonomic desk", "office chair", "standing desk",
        "eco kitchen", "sustainable kitchenware", "bamboo utensils", "zero waste",
        "vinyl records", "vintage music", "record collection", "classic albums",
        "gourmet coffee", "specialty beans", "single origin", "fair trade coffee",
        "home gym", "fitness equipment", "workout gear", "exercise machines",
        "children's books", "kids literature", "bedtime stories", "educational books",
        "artisan chocolate", "gourmet treats", "handmade confections", "chocolate gifts",
        "smart home", "home automation", "smart speakers", "connected devices",
        "camping gear", "outdoor equipment", "hiking supplies", "adventure gear"
    ],
    "settings": {
        "minimumBidAmount": 0.50
    }
}

export default mockData;