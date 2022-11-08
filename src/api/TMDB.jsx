import { MovieDb as API } from 'moviedb-promise';
import noImage from "../assets/no-actor-image.webp";


// Example request:
// https://api.themoviedb.org/3/movie/550?api_key=dca37411ffbd26dd961e300ca090b123

const KEY = "dca37411ffbd26dd961e300ca090b123"
const tmdbImagePathBase = "https://image.tmdb.org/t/p/"

export const MovieDB = new API(KEY);

export const getActorSearchSuggestions = (response) => {
   let suggestions = []
   if (response.results.length > 0) {
      let actors = response.results
      actors = actors.filter(r => r.known_for.some(m => m.media_type === "movie"))
      actors.sort((a, b) => b.popularity - a.popularity)
      actors.forEach((actor) => {
         if (actor.hasOwnProperty("name")) {
            suggestions.push({
               id: actor.id,
               name: actor.name,
               image: tmdbImagePathBase + "w200" + actor.profile_path
            })
         }
      })
   }
   return suggestions
}

export const getActorByID = (id, response) => {
   if (typeof response !== "object" || response.results.length === 0) return null
   const foundActor = response.results.find((a) => a.id.toString().toLowerCase() === id.toString().toLowerCase())
   return foundActor
}

export const getTopActorObject = (response) => {
   let topActor
   if (response.results.length > 0) {
      let actors = response.results;
      actors.sort((a, b) => b.popularity - a.popularity);
      topActor = actors[0]
   }
   return topActor
}

export const getActorName = (actorObj) => {
   if (typeof actorObj !== "object") return null
   if (actorObj.hasOwnProperty("name")) {
      return actorObj.name
   }
   return null
}

export const getActorImage = (actorObj, imgSize) => {
   if (typeof actorObj !== "object") return null
   let actorImage = noImage
   let size = imgSize || 500
   if (actorObj.hasOwnProperty("profile_path") && actorObj.profile_path !== null) {
      actorImage = tmdbImagePathBase + "w" + size + actorObj.profile_path
   }
   return actorImage
}

export const getMoviesKnownFor = (actorObj) => {
   let projects
   if (typeof actorObj !== "object") return null
   if (actorObj.hasOwnProperty("known_for")) {
      projects = actorObj.known_for
      projects = projects.filter(p => p.media_type === "movie")
      projects.sort((a, b) => b.vote_count - a.vote_count); // sort projects (movies and tv) by vote_count (an attempt to gauge popularity)
   }
   return projects
}

export const getMovieName = (movieObj) => {
   if (typeof movieObj !== "object") return null
   let movieName = "Nothing!"
   if (movieObj.hasOwnProperty("title")) {
      movieName = movieObj.title
   }
   return movieName
}

export const getMovieImage = (movieObj, imgSize) => {
   if (typeof movieObj !== "object") return null
   let movieImage = noImage
   let size = imgSize || 200
   if (movieObj.hasOwnProperty("poster_path") && movieObj.poster_path !== null) {
      movieImage = tmdbImagePathBase + "w" + size + movieObj.poster_path
   }
   return movieImage
}
