// Menu data for AI Restaurant
const menuData = {
    "restaurant": "AI Restaurang",
    "currency": "SEK",
    "last_updated": "2025-09-11",
    "dishes": [
        {
            "id": "SE-001",
            "name": "Köttbullar med potatismos och lingon",
            "category": "Husmanskost",
            "description": "Saftiga nöt- och fläskköttbullar serverade med smörigt potatismos, gräddsås, pressgurka och rårörda lingon.",
            "ingredients": [
                {"item": "Nötfärs", "amount": 300, "unit": "g"},
                {"item": "Fläskfärs", "amount": 200, "unit": "g"},
                {"item": "Lök", "amount": 1, "unit": "st"},
                {"item": "Ströbröd", "amount": 1, "unit": "dl"},
                {"item": "Mjölk", "amount": 2, "unit": "dl"},
                {"item": "Ägg", "amount": 1, "unit": "st"},
                {"item": "Potatis", "amount": 800, "unit": "g"},
                {"item": "Grädde", "amount": 2, "unit": "dl"}
            ],
            "allergens": ["gluten", "laktos", "ägg"],
            "priceSek": 139,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/ai-restaurant-97fbe.firebasestorage.app/o/meatballs.png?alt=media&token=39704c3d-1ece-43fa-b5a2-65d30d7ba38d",
            "imageAlt": "Köttbullar med potatismos, gräddsås och lingon",
            "tags": ["klassiker", "kött", "comfort-food"]
        },
        {
            "id": "SE-002",
            "name": "Kalops med kokt potatis och rödbetor",
            "category": "Husmanskost",
            "description": "Långkokt nötkött i mustig skysås smaksatt med kryddpeppar och lagerblad, serveras med potatis och inlagda rödbetor.",
            "ingredients": [
                {"item": "Högrev", "amount": 600, "unit": "g"},
                {"item": "Lök", "amount": 2, "unit": "st"},
                {"item": "Morot", "amount": 2, "unit": "st"},
                {"item": "Kryddpeppar", "amount": 10, "unit": "korn"},
                {"item": "Lagerblad", "amount": 2, "unit": "st"},
                {"item": "Potatis", "amount": 800, "unit": "g"}
            ],
            "allergens": [],
            "priceSek": 149,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/ai-restaurant-97fbe.firebasestorage.app/o/beef-stew.png?alt=media&token=376a2053-b1a6-4807-bad9-7c032fbaf5c2",
            "imageAlt": "Kalops i skål med potatis och rödbetor",
            "tags": ["långkok", "kött", "mustigt"]
        },
        {
            "id": "SE-003",
            "name": "Kålpudding med skysås",
            "category": "Husmanskost",
            "description": "Ugnsbakad färs och stekt vitkål med sirapston, serverad med skysås, potatis och lingon.",
            "ingredients": [
                {"item": "Vitkål", "amount": 800, "unit": "g"},
                {"item": "Nötfärs", "amount": 500, "unit": "g"},
                {"item": "Sirap", "amount": 2, "unit": "msk"},
                {"item": "Lök", "amount": 1, "unit": "st"},
                {"item": "Potatis", "amount": 700, "unit": "g"}
            ],
            "allergens": [],
            "priceSek": 139,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/ai-restaurant-97fbe.firebasestorage.app/o/cabbage-casserole.png?alt=media&token=0e4fd9b1-e728-4ca0-b5f0-df58e7f64041",
            "imageAlt": "Kålpudding med skysås och lingon",
            "tags": ["kött", "ugn", "söt-salt"]
        },
        {
            "id": "SE-004",
            "name": "Raggmunk med stekt fläsk",
            "category": "Husmanskost",
            "description": "Krispiga potatisplättar med stekt rimmad fläsk och lingonsylt.",
            "ingredients": [
                {"item": "Potatis", "amount": 600, "unit": "g"},
                {"item": "Vetemjöl", "amount": 1, "unit": "dl"},
                {"item": "Mjölk", "amount": 3, "unit": "dl"},
                {"item": "Ägg", "amount": 1, "unit": "st"},
                {"item": "Rimmat sidfläsk", "amount": 250, "unit": "g"}
            ],
            "allergens": ["gluten", "ägg", "laktos"],
            "priceSek": 129,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/ai-restaurant-97fbe.firebasestorage.app/o/potato-pancakes.png?alt=media&token=0438ca76-6eb1-4bc9-b81f-39e3046bd860",
            "imageAlt": "Raggmunkar med stekt fläsk och lingon",
            "tags": ["stek", "krispigt", "fläsk"]
        },
        {
            "id": "SE-005",
            "name": "Gravad lax med hovmästarsås",
            "category": "Fisk",
            "description": "Tunnskivad gravad lax med dill och socker-saltning, serverad med hovmästarsås och kokt potatis.",
            "ingredients": [
                {"item": "Laxfilé", "amount": 300, "unit": "g"},
                {"item": "Dill", "amount": 1, "unit": "knippe"},
                {"item": "Socker", "amount": 2, "unit": "msk"},
                {"item": "Salt", "amount": 2, "unit": "msk"},
                {"item": "Senap", "amount": 2, "unit": "msk"},
                {"item": "Olja", "amount": 0.5, "unit": "dl"}
            ],
            "allergens": ["fisk", "senap"],
            "priceSek": 159,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/ai-restaurant-97fbe.firebasestorage.app/o/baked-salmon.png?alt=media&token=9be75313-ea3d-41a8-a3a4-4de7fe6a8480",
            "imageAlt": "Gravad lax med dill och hovmästarsås",
            "tags": ["kallrätt", "fräsch", "klassiker"]
        },
        {
            "id": "SE-006",
            "name": "Pannkakor med sylt och grädde",
            "category": "Efterrätt",
            "description": "Tunna pannkakor serverade med jordgubbssylt och lättvispad grädde.",
            "ingredients": [
                {"item": "Vetemjöl", "amount": 2.5, "unit": "dl"},
                {"item": "Mjölk", "amount": 5, "unit": "dl"},
                {"item": "Ägg", "amount": 2, "unit": "st"},
                {"item": "Smör", "amount": 50, "unit": "g"}
            ],
            "allergens": ["gluten", "ägg", "laktos"],
            "priceSek": 89,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/ai-restaurant-97fbe.firebasestorage.app/o/pancakes.png?alt=media&token=44fd78ef-b852-41af-bd51-0f837a85cd09",
            "imageAlt": "Pannkakor med sylt och grädde",
            "tags": ["sött", "barnvänligt", "klassiker"]
        },
        {
            "id": "SE-007",
            "name": "Pytt i panna med stekt ägg",
            "category": "Husmanskost",
            "description": "Tärnad potatis, lök och kött som steks krispigt, toppat med stekt ägg och rödbetor.",
            "ingredients": [
                {"item": "Potatis", "amount": 500, "unit": "g"},
                {"item": "Lök", "amount": 1, "unit": "st"},
                {"item": "Nötkött/korv", "amount": 250, "unit": "g"},
                {"item": "Ägg", "amount": 1, "unit": "st"}
            ],
            "allergens": ["ägg"],
            "priceSek": 119,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/ai-restaurant-97fbe.firebasestorage.app/o/pyttipanna.png?alt=media&token=d98befb7-f69b-4527-98db-68cf631095bd",
            "imageAlt": "Pytt i panna med stekt ägg och rödbetor",
            "tags": ["snabbt", "stek", "krispigt"]
        },
        {
            "id": "SE-008",
            "name": "Lax i ugn med citron och dill",
            "category": "Fisk",
            "description": "Ugnsbakad laxfilé med citron, dill och smör, serverad med rostad potatis och sparris.",
            "ingredients": [
                {"item": "Laxfilé", "amount": 400, "unit": "g"},
                {"item": "Citron", "amount": 1, "unit": "st"},
                {"item": "Dill", "amount": 1, "unit": "knippe"},
                {"item": "Smör", "amount": 25, "unit": "g"}
            ],
            "allergens": ["fisk", "laktos"],
            "priceSek": 169,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/ai-restaurant-97fbe.firebasestorage.app/o/baked-salmon.png?alt=media&token=9be75313-ea3d-41a8-a3a4-4de7fe6a8480",
            "imageAlt": "Ugnsbakad lax med citron och dill",
            "tags": ["fräscht", "ugn", "glutenfritt"]
        },
        {
            "id": "SE-009",
            "name": "Svampstroganoff (vegansk)",
            "category": "Veganskt",
            "description": "Krämig stroganoff på skogssvamp, lök och tomat, serverad med ris.",
            "ingredients": [
                {"item": "Blandad svamp", "amount": 400, "unit": "g"},
                {"item": "Lök", "amount": 1, "unit": "st"},
                {"item": "Vitlök", "amount": 2, "unit": "klyftor"},
                {"item": "Krossade tomater", "amount": 400, "unit": "g"},
                {"item": "Havregrädde", "amount": 2, "unit": "dl"}
            ],
            "allergens": ["glutenfri"],
            "priceSek": 129,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/ai-restaurant-97fbe.firebasestorage.app/o/stroganoff-vegan.png?alt=media&token=4a5f9c7e-a82b-43b3-9b4a-be6dc424ebd3",
            "imageAlt": "Vegansk svampstroganoff med ris",
            "tags": ["växtbaserat", "krämigt", "laktosfritt"]
        },
        {
            "id": "SE-010",
            "name": "Morots- och linssoppa",
            "category": "Vegetariskt",
            "description": "Silkeslen soppa på morot, röda linser och ingefära, toppad med crème fraiche och pumpafrön.",
            "ingredients": [
                {"item": "Morot", "amount": 600, "unit": "g"},
                {"item": "Röda linser", "amount": 2, "unit": "dl"},
                {"item": "Lök", "amount": 1, "unit": "st"},
                {"item": "Ingefära", "amount": 1, "unit": "msk"},
                {"item": "Grönsaksbuljong", "amount": 1, "unit": "l"}
            ],
            "allergens": [],
            "priceSek": 99,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/ai-restaurant-97fbe.firebasestorage.app/o/carrots-soup.png?alt=media&token=98730c75-a404-480f-b496-defbb940e5b6",
            "imageAlt": "Morots- och linssoppa i skål med topping",
            "tags": ["soppa", "värmande", "billigt"]
        },
        {
            "id": "SE-011",
            "name": "Caesarsallad med kyckling",
            "category": "Sallad",
            "description": "Krispig romansallad, grillad kyckling, krutonger och parmesan med klassisk caesardressing.",
            "ingredients": [
                {"item": "Romansallad", "amount": 1, "unit": "huvud"},
                {"item": "Kycklingfilé", "amount": 250, "unit": "g"},
                {"item": "Parmesan", "amount": 40, "unit": "g"},
                {"item": "Krutonger", "amount": 1, "unit": "dl"},
                {"item": "Caesardressing", "amount": 0.8, "unit": "dl"}
            ],
            "allergens": ["ägg", "fisk", "gluten", "laktos"],
            "priceSek": 129,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/ai-restaurant-97fbe.firebasestorage.app/o/ceasar-sallad.png?alt=media&token=552ae519-b99e-4599-855e-637e5acd2d6f",
            "imageAlt": "Caesarsallad med kyckling, krutonger och parmesan",
            "tags": ["fräscht", "lunch", "populärt"]
        },
        {
            "id": "SE-012",
            "name": "Halloumitaco med avokadosalsa",
            "category": "Vegetariskt",
            "description": "Stekt halloumi i mjuka tortillabröd med krämig avokadosalsa, picklad rödlök och koriander.",
            "ingredients": [
                {"item": "Halloumi", "amount": 200, "unit": "g"},
                {"item": "Tortillabröd", "amount": 6, "unit": "st"},
                {"item": "Avokado", "amount": 1, "unit": "st"},
                {"item": "Rödlök", "amount": 0.5, "unit": "st"},
                {"item": "Koriander", "amount": 1, "unit": "kruka"}
            ],
            "allergens": ["gluten", "laktos"],
            "priceSek": 119,
            "imageUrl": "https://firebasestorage.googleapis.com/v0/b/ai-restaurant-97fbe.firebasestorage.app/o/halloumi.png?alt=media&token=a27c4721-7f4a-478b-b319-b9e759adf26d",
            "imageAlt": "Halloumitacos med avokadosalsa och picklad rödlök",
            "tags": ["street-food", "snabbt", "vegetariskt"]
        }
    ]
};

module.exports = menuData;