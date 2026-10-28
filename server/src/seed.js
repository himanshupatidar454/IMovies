require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Movie = require("./models/Movie");
const Show = require("./models/Show");
const User = require("./models/User");

const movieData = [
 { title:"The Last Horizon", description:"A pilot races against time to save a stranded crew beyond the edge of known space.", posterUrl:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80", backdropUrl:"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1600&q=80", genre:["Sci-Fi","Adventure"], language:"English", durationMinutes:132, certificate:"UA 13+", rating:8.2, featured:true },
 { title:"City of Shadows", description:"An honest detective uncovers a conspiracy hidden beneath a city that never sleeps.", posterUrl:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=80", backdropUrl:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=80", genre:["Thriller","Drama"], language:"Hindi", durationMinutes:146, certificate:"UA 16+", rating:7.8, featured:true },
 { title:"Monsoon Letters", description:"Two strangers find their lives connected by a series of letters during monsoon season.", posterUrl:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", backdropUrl:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80", genre:["Romance","Drama"], language:"Hindi", durationMinutes:124, certificate:"U", rating:7.4 },
 { title:"The Final Lap", description:"A young racer risks everything for one last shot at the championship.", posterUrl:"https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80", backdropUrl:"https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80", genre:["Action","Sport"], language:"English", durationMinutes:118, certificate:"UA 13+", rating:8.0 }
];
function makeSeats() {
  const seats = [];
  for (const row of ["A","B","C","D","E","F"]) for (let n=1;n<=10;n++)
    seats.push({ seatNumber:`${row}${n}`, row, status:"available" });
  return seats;
}
async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/imovies");
  await Movie.deleteMany({});
  await Show.deleteMany({});
  await Movie.insertMany(movieData);
  const movies = await Movie.find();
  const now = Date.now();
  const shows = [];
  for (const movie of movies) for (const [i, hour] of [17,20,22].entries()) {
    const startsAt = new Date(now + (i+1)*86400000);
    startsAt.setHours(hour, 0, 0, 0);
    shows.push({ movie:movie._id, theatreName:"IMovies Cinemas", screenName:`Screen ${i+1}`, city:"Your City", startsAt, price:220+i*40, seats:makeSeats() });
  }
  await Show.insertMany(shows);
  const email = "admin@imovies.local";
  await User.findOneAndUpdate({ email }, { name:"IMovies Admin", email, passwordHash:await bcrypt.hash("Admin123!",12), role:"admin" }, { upsert:true, new:true, setDefaultsOnInsert:true });
  console.log(`Seeded ${movies.length} movies, ${shows.length} shows, and demo admin ${email}`);
  await mongoose.disconnect();
}
seed().catch(e => { console.error(e); process.exit(1); });
