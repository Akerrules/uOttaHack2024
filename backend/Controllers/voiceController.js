const { CohereClient } = require("cohere-ai");
const COHERE_API_KEY = process.env.COHERE_API_KEY;
const cohere = new CohereClient({
  token: COHERE_API_KEY,
});
const axios = require("axios");

exports.user_list = async (req, res) => {
  try {
    const users = "hello";
    res.json(users); // Send JSON response
  } catch (error) {
    res.status(500).send(error);
  }
};
// Handle User create on POST
exports.user_create = async (req, res) => {
  try {
    // const newUser = new User({
    //   name: req.body.name,
    //   // other fields...
    // });
    // const savedUser = await newUser.save();
    console.log(req.body.location);
    let label = await find_classify(req.body.transcript); // Assuming find_classify is an async function
    console.log("label:", label);

    let result_service = await service(
      label,
      req.body.transcript,
      req.body.location
    );
    let result_send = {
      label: label,
      data: result_service.data,
      speak: result_service.speak,
    };
    console.log("service result:", result);
    res.status(201).json(result_send);
  } catch (error) {
    res.status(500).send(error);
  }
};

function service(label, transcript, curentLocation) {
  result = "";
  if (label === "Navigation") {
    result = get_Navigation(transcript);
    return result;
  } else if (label === "Find_Nearby") {
    result = get_Find_Near(transcript, curentLocation);
    return result;
  } else if (label === "Request_Joke") {
    console.log("calling jokes");
    result = get_Jokes(transcript);
    console.log("jokes", result);
    return result;
  }
}

function get_Navigation(transcript) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await cohere.generate({
        model: "command",
        prompt:
          '"Extract and return a concise list of all destinations mentioned in the following text, without including any additional details or commentary in a array format. After listing please do not add any commentary or text. Text:' +
          transcript +
          "Please format your response as a simple list of destinations.'\"",
        maxTokens: 46,
        temperature: 0.9,
        k: 0,
        stopSequences: [],
        returnLikelihoods: "NONE",
      });
      console.log(response.generations[0].text);
      let result = response.generations[0].text; //need to find[]
      result = result.slice(result.indexOf("[") + 1, result.indexOf("]"));
      let result_list = result.split(",");
      console.log("should be an array", result);
      try {
        // Prepare the URL of the second controller's API
        // Assuming localhost for simplicity; in a real scenario, this could be a different service URL
        console.log("origin:", result_list[0], "destination", result_list[1]);
        const response = await axios.post("http://localhost:3500/places/", {
          origin: result_list[0],
          destination: result_list[1],
          placeType: "electric_vehicle_charging_station",
        });

        // var tmp =
        //   "Generate a response for the given tag. Example: here all the ev charging station along the way to your route!'. here is the list of the starting place and destination" +
        //   result +
        //   ". first be happy about their destination and tell them ur excited to guide them and then Say something breif about  the destination like a fact! Then say how many ev charging station there are using this list :" +
        //   JSON.stringify(response.data);
        // // console.log(response.data.filter(Boolean));

        // const response2 = await cohere.generate({
        //   model: "command",
        //   prompt: tmp,

        //   maxTokens: 200,
        //   temperature: 0.9,
        //   k: 0,
        //   stopSequences: [],
        //   returnLikelihoods: "NONE",
        // });
        const response2 = await cohere.generate({
          model: "command",
          prompt:
            "Generate a response for the given tag. Example: here all the ev charging station along the way to your route!'. here is the list of the starting place and destination" +
            result +
            ".Say something about the destination like a fact ",
          maxTokens: 100,
          temperature: 0.9,
          k: 0,
          stopSequences: [],
          returnLikelihoods: "NONE",
        });
        result = {
          data: response.data,
          speak: response2.generations[0].text,
        };
      } catch (error) {
        console.log(error);
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

function get_Find_Near(transcript, currentLocation) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await cohere.generate({
        model: "command",
        prompt:
          "Given the user's text:=\"" +
          transcript +
          '" identify and return the type of place they are looking for from the given list find the best match and just return the match not extra text and its ok if its vaugue. here is list of places : "car_dealer car_rental, car_repair, car_wash, electric_vehicle_charging_station, gas_station, parking, rest_stop, art_gallery, museum, performing_arts_theater, library,preschool, primary_school	school, secondary_school , university, amusement_center, amusement_park, aquarium, banquet_hall, bowling_alley, casino, community_center, convention_center, cultural_center, dog_park, event_venue, hiking_area, historical_landmark, marina, movie_rental, movie_theater, national_park, night_club, park, tourist_attraction, visitor_center, wedding_venue, zoo, american_restaurant, bakery, bar, barbecue_restaurant, brazilian_restaurant, breakfast_restaurant, brunch_restaurant, cafe, chinese_restaurant, coffee_shop, fast_food_restaurant, french_restaurant, greek_restaurant, hamburger_restaurant, ice_cream_shop, indian_restaurant, indonesian_restaurant, italian_restaurant, japanese_restaurant, korean_restaurant	lebanese_restaurant, meal_delivery, meal_takeaway, mediterranean_restaurant, mexican_restaurant, middle_eastern_restaurant, pizza_restaurant, ramen_restaurant, restaurant, sandwich_shop, seafood_restaurant, spanish_restaurant, steak_house, sushi_restaurant, thai_restaurant, turkish_restaurant, vegan_restaurant, vegetarian_restaurant, vietnamese_restaurant,barber_shop, beauty_salon, cemetery, child_care_agency, consultant, courier_service, electrician, florist, funeral_home, hair_care, hair_salon, insurance_agency,	laundry, lawyer, locksmith, moving_company, painter, plumber, real_estate_agency, roofing_contractor, storage, tailor, telecommunications_service_provider, travel_agency, veterinary_care,auto_parts_store, bicycle_store, book_store, cell_phone_store, clothing_store, convenience_store, department_store, discount_store, electronics_store, furniture_store, gift_shop, grocery_store, hardware_store, home_goods_store, home_improvement_store, jewelry_store, liquor_store, market, pet_store, shoe_store, shopping_mall, sporting_goods_store, store, supermarket, wholesaler". No any additional details or commentary just the word. Make sure NO NO commentary and additional details  ',
        maxTokens: 46,
        temperature: 0.9,
        k: 0,
        stopSequences: [],
        returnLikelihoods: "NONE",
      });
      console.log(response.generations[0].text);
      var result = response.generations[0].text.toLowerCase();
      try {
        // Prepare the URL of the second controller's API
        // Assuming localhost for simplicity; in a real scenario, this could be a different service URL
        const response = await axios.post(
          "http://localhost:3500/nearbyPlaces/",
          {
            lat: currentLocation.lat,
            lng: currentLocation.lng,
            placeType: result,
          }
        );
        console.log(
          "cohere:",
          "Generate a response for the given tag. Example: For 'coffee_shop', the response should be 'Here are the nearest coffee shops!'. here is the list of the item:" +
            JSON.stringify(response.data) +
            "and the tag is:" +
            result +
            ". Don't add comentry it just need to be general like alexa. Be breif and just list few "
        );
        // Use the response from the second controller
        const response2 = await cohere.generate({
          model: "command",
          prompt:
            "Generate a response for the given tag. Example: For 'coffee_shop', the response should be 'Here are the nearest coffee shops!'. here is the list of the item:" +
            JSON.stringify(response.data) +
            "and the tag is:" +
            result +
            ". Don't add comentry it just need to be general like alexa.",
          maxTokens: 200,
          temperature: 0.9,
          k: 0,
          stopSequences: [],
          returnLikelihoods: "NONE",
        });
        result = { data: response.data, speak: response2.generations[0].text };
        console.log(result);
      } catch (error) {
        // Handle errors, such as network issues or receiving an error response
        console.error("Error calling second controller:", error);
        res.status(500).send("Error calling second controller");
      }
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

function get_Jokes(transcript) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await cohere.generate({
        model: "command",
        prompt: transcript,
        maxTokens: 200,
        temperature: 0.9,
        k: 0,
        stopSequences: [],
        returnLikelihoods: "NONE",
      });
      console.log(response.generations[0].text);
      result = { data: "", speak: response.generations[0].text };

      console.log("should be sending jokes back");
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
function find_classify(input) {
  // Return the Promise directly from find_classify
  return new Promise(async (resolve, reject) => {
    try {
      const classify = await cohere.classify({
        examples: [
          { text: "Navigate to Toronto.", label: "Navigation" },
          { text: "Set my destination to New York City.", label: "Navigation" },
          { text: "I want to go to Los Angeles.", label: "Navigation" },
          { text: "How do I get to Miami?", label: "Navigation" },
          { text: "My destination is Chicago.", label: "Navigation" },
          { text: "Show me the way to San Francisco.", label: "Navigation" },
          { text: "Directions to Boston, please.", label: "Navigation" },
          { text: "Can you find a route to Las Vegas?", label: "Navigation" },
          { text: "I need to go to Orlando.", label: "Navigation" },
          { text: "Plan a trip to Seattle.", label: "Navigation" },
          { text: "Let's head to Austin.", label: "Navigation" },
          { text: "I'm going to Denver.", label: "Navigation" },
          { text: "Find the fastest route to Atlanta.", label: "Navigation" },
          { text: "I want to go to Toronto.", label: "Navigation" },
          { text: "My destination is Chicago.", label: "Navigation" },
          {
            text: "Navigate to the nearest gas station.",
            label: "Find_Nearby",
          },
          {
            text: "How do I get to the closest airport?",
            label: "Find_Nearby",
          },
          {
            text: "Show me directions to the best pizza place around.",
            label: "Find_Nearby",
          },
          {
            text: "Where is the nearest charging station for my car?",
            label: "Find_Nearby",
          },
          { text: "Find a parking lot near me.", label: "Find_Nearby" },
          { text: "I'm looking for the closest hotel.", label: "Find_Nearby" },
          { text: "Take me to the nearest hospital.", label: "Find_Nearby" },
          { text: "How far is the nearest coffee shop?", label: "Find_Nearby" },
          { text: "Locate the closest pharmacy.", label: "Find_Nearby" },
          {
            text: "I need directions to the nearest ATM.",
            label: "Find_Nearby",
          },
          { text: "Find the nearest restroom.", label: "Find_Nearby" },
          {
            text: "Direct me to the closest shopping mall.",
            label: "Find_Nearby",
          },
          { text: "Show nearby tourist attractions.", label: "Find_Nearby" },
          { text: "Where can I find the nearest park?", label: "Find_Nearby" },
          { text: "Guide me to the nearest library.", label: "Find_Nearby" },
          {
            text: "I'm looking for a nearby laundromat.",
            label: "Find_Nearby",
          },
          { text: "Take me to the closest beach.", label: "Find_Nearby" },
          { text: "Find a nearby grocery store.", label: "Find_Nearby" },
          { text: "Hey, I want a coffee.", label: "Find_Nearby" },
          { text: "I'm craving sushi right now.", label: "Find_Nearby" },
          {
            text: "Where can I find the best burgers around?",
            label: "Find_Nearby",
          },
          { text: "I need to fill up my tank.", label: "Find_Nearby" },
          { text: "Is there a pharmacy nearby?", label: "Find_Nearby" },
          {
            text: "I could use a good workout. Any gyms close by?",
            label: "Find_Nearby",
          },
          {
            text: "I'm looking for a place to relax. Any parks around?",
            label: "Find_Nearby",
          },
          { text: "Find me a quiet place to read.", label: "Find_Nearby" },
          { text: "I need to buy groceries.", label: "Find_Nearby" },
          { text: "Where's the nearest restroom?", label: "Find_Nearby" },
          {
            text: "I want to see a movie. Where's the closest cinema?",
            label: "Find_Nearby",
          },
          {
            text: "I need a charging station for my car.",
            label: "Find_Nearby",
          },
          { text: "Where can I get a quick snack?", label: "Find_Nearby" },
          {
            text: "I'm looking for a vegan restaurant nearby.",
            label: "Find_Nearby",
          },
          {
            text: "Find a nearby playground for the kids.",
            label: "Find_Nearby",
          },
          {
            text: "I need a new tire. Where's the closest auto repair shop?",
            label: "Find_Nearby",
          },
          { text: "Is there a hotel around here?", label: "Find_Nearby" },
          {
            text: "I want to mail a package. Where's the nearest post office?",
            label: "Find_Nearby",
          },
          {
            text: "I need a haircut. Recommend a salon.",
            label: "Find_Nearby",
          },
          {
            text: "Where can I buy flowers around here?",
            label: "Find_Nearby",
          },
          { text: "Tell me a joke.", label: "Request_Joke" },
          {
            text: "I need a good laugh. Know any jokes?",
            label: "Request_Joke",
          },
          { text: "Can you share a funny joke?", label: "Request_Joke" },
          {
            text: "I'm bored. Entertain me with a joke.",
            label: "Request_Joke",
          },
          {
            text: "Do you know any good knock-knock jokes?",
            label: "Request_Joke",
          },
          { text: "Hit me with your best joke.", label: "Request_Joke" },
          { text: "I love puns. Got any?", label: "Request_Joke" },
          { text: "Share something funny.", label: "Request_Joke" },
          { text: "I need a dad joke to cheer me up.", label: "Request_Joke" },
          { text: "What's the funniest joke you know?", label: "Request_Joke" },
          { text: "Got any jokes about cars?", label: "Request_Joke" },
          {
            text: "Tell me something to make me smile.",
            label: "Request_Joke",
          },
          { text: "I want to hear a science joke.", label: "Request_Joke" },
          { text: "Know any tech jokes?", label: "Request_Joke" },
          {
            text: "I could use a silly joke right now.",
            label: "Request_Joke",
          },
          { text: "Give me a joke of the day.", label: "Request_Joke" },
          { text: "Any good jokes about food?", label: "Request_Joke" },
          {
            text: "Tell me a joke that will make me laugh out loud.",
            label: "Request_Joke",
          },
          { text: "I need a funny joke for kids.", label: "Request_Joke" },
          { text: "Share a classic joke with me.", label: "Request_Joke" },
        ],
        inputs: [input],
      });
      console.log(classify);
      // Assuming you want to resolve with the first prediction label
      const prediction = classify["classifications"][0]["prediction"];
      console.log(prediction);
      resolve(prediction); // Resolve the promise with the prediction
    } catch (error) {
      console.error(error);
      reject(error); // Reject the promise if there's an error
    }
  });
}
