const gamePacks: GamePack[] = [
    new GamePack("Animals", [
        "Elephant", "Tiger", "Kangaroo", "Penguin", "Dolphin",
        "Cheetah", "Hawk", "Frog", "Giraffe", "Crocodile",
        "Panda", "Koala", "Octopus", "Shark", "Whale",
        "Horse", "Eagle", "Bear", "Wolf", "Chimpanzee",
        "Rabbit", "Snake", "Lion", "Zebra", "Ostrich",
        "Camel", "Alligator", "Leopard", "Hippopotamus", "Bison",
        "Fox", "Bat", "Jellyfish", "Starfish", "Walrus",
        "Seahorse", "Peacock", "Flamingo", "Toucan", "Raccoon",
        "Otter", "Squirrel", "Badger", "Crab", "Lobster",
        "Butterfly", "Bee", "Ant", "Mole", "Lemur"
    ]),
    new GamePack("Fruits", [
        "Apple", "Banana", "Cherry", "Date", "Grape",
        "Mango", "Orange", "Papaya", "Pineapple", "Strawberry",
        "Blueberry", "Raspberry", "Blackberry", "Watermelon", "Cantaloupe",
        "Honeydew", "Kiwi", "Peach", "Plum", "Apricot",
        "Fig", "Pomegranate", "Guava", "Lychee", "Coconut",
        "Passionfruit", "Dragonfruit", "Persimmon", "Starfruit", "Tamarind",
        "Cranberry", "Gooseberry", "Mulberry", "Lemon", "Lime",
        "Tangerine", "Clementine", "Mandarin", "Nectarine", "Quince",
        "Avocado", "Durian", "Jackfruit", "Olive", "Soursop",
        "Sapodilla", "Breadfruit", "Acai", "Kumquat", "Ugli Fruit"
    ], './src/img/fruits.png'),
    new GamePack("Countries", [
        "Argentina", "Brazil", "Canada", "Denmark", "Egypt",
        "France", "Germany", "India", "Japan", "Kenya",
        "Australia", "Russia", "China", "South Africa", "Mexico",
        "Spain", "Italy", "Sweden", "Norway", "Finland",
        "Iceland", "Portugal", "Greece", "Turkey", "Thailand",
        "Vietnam", "Philippines", "Malaysia", "Indonesia", "Singapore",
        "United Kingdom", "United States", "Peru", "Chile", "Colombia",
        "Nigeria", "Morocco", "Algeria", "Ethiopia", "Sudan",
        "Iran", "Iraq", "Syria", "Israel", "Jordan",
        "Saudi Arabia", "New Zealand", "Ireland", "Poland", "Ukraine"
    ]),
    new GamePack("Movies", [
        "Inception", "Titanic", "Avatar", "The Matrix", "Gladiator",
        "Parasite", "Frozen", "Interstellar", "Joker", "Shrek",
        "The Lion King", "The Godfather", "Pulp Fiction", "The Avengers", "Star Wars",
        "The Dark Knight", "Harry Potter", "Jurassic Park", "Finding Nemo", "Toy Story",
        "Up", "Wall-E", "The Shawshank Redemption", "Forrest Gump", "The Lord of the Rings",
        "The Hobbit", "Spider-Man", "Iron Man", "Black Panther", "Doctor Strange",
        "Captain America", "Thor", "Guardians of the Galaxy", "Coco", "Frozen II",
        "Beauty and the Beast", "Aladdin", "Mulan", "The Little Mermaid", "Moana",
        "Encanto", "Zootopia", "Madagascar", "Kung Fu Panda", "How to Train Your Dragon",
        "The Incredibles", "Ratatouille", "Cinderella", "Snow White", "Sleeping Beauty"
    ]),
    new GamePack("Sports", [
        "Soccer", "Basketball", "Tennis", "Cricket", "Hockey",
        "Baseball", "Rugby", "Golf", "Boxing", "Swimming",
        "Table Tennis", "Badminton", "Volleyball", "Wrestling", "Judo",
        "Karate", "Taekwondo", "Cycling", "Skateboarding", "Surfing",
        "Snowboarding", "Skiing", "Gymnastics", "Archery", "Fencing",
        "Shooting", "Rowing", "Canoeing", "Kayaking", "Sailing",
        "Equestrian", "Track and Field", "Marathon", "Triathlon", "Diving",
        "Water Polo", "Weightlifting", "Powerlifting", "Bodybuilding", "Billiards",
        "Snooker", "Esports", "Skating", "Ice Hockey", "Lacrosse",
        "American Football", "Handball", "Racquetball", "Squash", "Polo", 'Sex'
    ]),
    new GamePack("Vegetables", [
        "Carrot", "Potato", "Tomato", "Onion", "Garlic",
        "Broccoli", "Cauliflower", "Spinach", "Lettuce", "Kale",
        "Cucumber", "Zucchini", "Peas", "Green Beans", "Bell Pepper",
        "Chili", "Eggplant", "Pumpkin", "Squash", "Sweet Potato",
        "Radish", "Beetroot", "Turnip", "Leek", "Celery",
        "Cabbage", "Artichoke", "Asparagus", "Okra", "Corn",
        "Mushroom", "Brussels Sprouts", "Fennel", "Parsnip", "Chives",
        "Scallion", "Ginger", "Turmeric", "Shallot", "Bok Choy",
        "Watercress", "Horseradish", "Daikon", "Endive", "Collard Greens",
        "Swiss Chard", "Rutabaga", "Yucca", "Wasabi", "Seaweed"
    ]),
    new GamePack("Trees", [
        "Oak", "Pine", "Maple", "Birch", "Spruce",
        "Willow", "Cedar", "Cherry Blossom", "Bamboo", "Redwood",
        "Sequoia", "Palm", "Eucalyptus", "Aspen", "Sycamore",
        "Baobab", "Mangrove", "Cypress", "Fir", "Hemlock",
        "Elm", "Chestnut", "Walnut", "Hazelnut", "Beech",
        "Alder", "Cottonwood", "Dogwood", "Hawthorn", "Juniper",
        "Magnolia", "Acacia", "Fig", "Olive", "Peach",
        "Apple", "Pear", "Plum", "Lemon", "Lime",
        "Orange", "Banana", "Papaya", "Avocado", "Rubber Tree",
        "Coconut Palm", "Date Palm", "Teak", "Mahogany", "Ebony"
    ], './src/img/trees.png'),
    new GamePack("Top Cities", [
        "New York", "London", "Tokyo", "Paris", "Los Angeles",
        "Chicago", "Beijing", "Shanghai", "Mumbai", "Dubai",
        "Singapore", "Hong Kong", "Bangkok", "Moscow", "Istanbul",
        "Rome", "Berlin", "Madrid", "Sydney", "Toronto",
        "Seoul", "San Francisco", "Buenos Aires", "Mexico City", "Cairo",
        "Rio de Janeiro", "Lima", "São Paulo", "Cape Town", "Nairobi",
        "Jakarta", "Kuala Lumpur", "Lisbon", "Athens", "Dublin",
        "Warsaw", "Prague", "Budapest", "Vienna", "Stockholm",
        "Copenhagen", "Helsinki", "Oslo", "Brussels", "Zurich",
        "Geneva", "Amsterdam", "Venice", "Florence", "Barcelona"
    ]),
    new GamePack("Everyday Colors", [
        "Red", "Blue", "Green", "Yellow", "Black",
        "White", "Orange", "Purple", "Pink", "Brown",
        "Gray", "Beige", "Gold", "Silver"
    ]),
    new GamePack("Shapes", [
        "Circle", "Square", "Triangle", "Rectangle", "Oval",
        "Hexagon", "Pentagon", "Octagon", "Diamond", "Star",
        "Heart", "Crescent", "Arrow", "Cube", "Sphere",
        "Pyramid", "Cylinder", "Cone", "Line", "Parallelogram"
    ], './src/img/shapes.png'),
    new GamePack("Musical Instruments", [
        "Guitar", "Piano", "Drums", "Violin", "Flute",
        "Saxophone", "Trumpet", "Harp", "Cello", "Clarinet",
        "Trombone", "Tuba", "Bass Guitar", "Ukulele", "Mandolin",
        "Accordion", "Bagpipes", "Bongo", "Oboe", "Tambourine",
        "Maracas", "Xylophone", "Synthesizer", "Harmonica", "Recorder"
    ]),
    new GamePack("Household Items", [
        "Table", "Chair", "Sofa", "Bed", "Lamp",
        "Clock", "Television", "Fan", "Mirror", "Carpet",
        "Curtains", "Cushion", "Desk", "Bookshelf", "Stove",
        "Refrigerator", "Oven", "Microwave", "Washing Machine", "Vacuum Cleaner",
        "Dishwasher", "Toaster", "Blender", "Iron", "Kettle"
    ]),
    new GamePack("Weather", [
        "Sunny", "Cloudy", "Rainy", "Stormy", "Windy",
        "Snowy", "Foggy", "Humid", "Hail", "Thunder",
        "Lightning", "Drizzle", "Breeze", "Gale", "Mist",
        "Dew", "Frost", "Hurricane", "Tornado", "Blizzard"
    ], './src/img/weather.png'),
    new GamePack("Original 151 Pokemon", ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran♀","Nidorina","Nidoqueen","Nidoran♂","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","AbraKadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","MukShellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","SeadraGoldeen","Seaking","Staryu","Starmie","Mr.Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"])
]