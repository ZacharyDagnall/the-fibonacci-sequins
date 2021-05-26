import { TapGestureHandler } from "react-native-gesture-handler";

//words that we want to prevent users from being able to type in as their name, "No-No Words" or "inappropriate language"
const noNoWords = [
  "shit",
  "fuck",
  "bitch",
  "poop",
  "piss",
  "butt",
  "booty",
  "pussy",
  "vagina",
  "penis",
  "boob",
  "sex",
  "cunt",
  "cock",
  "twat",
  "felatio",
  "fellatio",
  "69",
  "horny",
  "nigger",
  "gypsy",
  "nazi",
  "marijuana",
  "420",
  "chink",
  "nigga",
  "gook",
  "gringo",
  "guido",
  "injun",
  "jigaboo",
  "nipple",
  "redskin",
  "fag",
  "wetback",
  "tranny",
  "queer",
  "bimbo",
  "slut",
  "bastard",
  "bullocks",
  "choad",
  "whore",
  "abortion",
  "areola",
  "beaner",
  "barf",
  "masturbat",
  "mastabat",
  "jerk",
  "boner",
  "breast",
  "cameltoe",
  "clit",
  "cocaine",
  "condom",
  "crotch",
  "cunilingus",
  "cunillingus",
  "cunnilingus",
  "cunnt",
  "defecat",
  "dildo",
  "ejaculat",
  "erection",
  "orgasm",
  "feces",
  "fck",
  "barf",
  "fart",
  "fetish",
  "foreskin",
  "fornicate",
  "fucck",
  "genital",
  "gonorrehea",
  "hitler",
  "herpes",
  "hussy",
  "hymen",
  "hymie",
  "incest",
  "kunilingus",
  "kunnilingus",
  "lesbo",
  "lezbo",
  "mofo",
  "molest",
  "panties",
  "penile",
  "porn",
  "prostitut",
  "queef",
  "retard",
  "sperm",
  "bdsm",
  "skank",
  "stiffy",
  "jizz",
  "spooge",
  "swastika",
  "tampon",
  "tarbaby",
  "suicide",
  "syphilis",
  "terroris",
  "testicle",
  "threesome",
  "tits",
  "titties",
  "titty",
  "upskirt",
  "uterus",
  "vulva",
  "vomit",
  "wank",
  "virgin",
  "weiner",
  "whigger",
  "wigger",
  "mongoloid",
  "cripple",
  "rapist",
  "this is basically 2048",
  "fibonacci himself",
];
//these are words that may be harder to handle programatically, without cutting out innocent words like "Japanese Boy" or "Analytical thinker"... not sure what to do with them yet
const noNoWordsContinued = [
  "ass", //brass, lass, pass, etc
  "anus",
  "anal", //banal, analysis, analytical
  "cum", //cumpleaños
  "dick", //literally Dick Van Dyke couldnt put in his name unless i'm really clever, ugh
  "coon", //raccoon
  "jap", //japanese
  "nip", //Cheese Nips (apparently this is a slur from Nipponese)
  "spic", //tons of words contain this. but Spick would be a problem too.. but Auspicious is fine, Spice, Spicy
  "prick", //prick not great, prickly is fine
  "dyke", //can be a real last name..
  "twink", //twink derogatory, twinkle is fine.
  "chode", //psychodelic
  "arse",
  "balls",
  "nuts",
  "homo",
  "kkk", //Zakkkkk
  "orgy", //porgy, a type of fish
  "orgies",
  "penetrat", //impenetrable
  "rape", //drapes etc
  "semen",
  "pimp", //pimple
  //   "skeet", //this one is weird idk
  "tit", //entitle, titanic
];
// "jim crow", //just "Jim" or "Crow" would be okay. I could put "jim crow" in the other list but what about "Jim N. Crow" or something? won't get caught...
const noNoWordsPairs = [
  ["jim", "crow"],
  ["blow", "job"],
  ["hand", "job"],
  ["rim", "job"],
  ["gang", "bang"],
  ["red", "skin"],
  ["carpet", "muncher"],
  ["deep", "throat"],
  ["sixty", "nine"],
  ["four", "twenty"],
  ["skin", "flute"],
  ["thick", "lips"],
];
export function isNameOkay(name) {
  name = name.toLowerCase();
  //check to see its short enough
  if (name.length > 25) {
    return false;
  }
  //check to see that it is appropriate
  for (let i = 0; i < noNoWords.length; i++) {
    if (name.includes(noNoWords[i])) {
      return false;
    }
  }
  for (let j = 0; j < noNoWordsContinued.length; j++) {
    if (
      name.includes(" " + noNoWordsContinued[j] + " ") ||
      name === noNoWordsContinued[j]
    ) {
      return false;
    }
  }
  for (let k = 0; k < noNoWordsPairs.length; k++) {
    if (
      name.includes(noNoWordsPairs[k][0]) &&
      name.includes(noNoWordsPairs[k][1])
    ) {
      return false;
    }
  }
  return true;
}
