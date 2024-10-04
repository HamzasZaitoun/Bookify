const URL_API = "https://api.github.com";

export async function getAllUsers() {
  try {
    const res = await fetch(`${URL_API}/users`);
    if (!res.ok) {
      console.log("Error");
      return;
    }
    const users = await res.json();  // Added await here to properly wait for the JSON response
    console.log(users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function getUserById(id) { // Changed 'Number' type annotation to normal JS
  try {
    const res = await fetch(`${URL_API}/users/${id}`);
    if (!res.ok) {
      throw new Error(`Error fetching user with id: ${id}`);
    }
    const data = await res.json();  // Added await here as well
    return data;
  } catch (error) {
    console.error(error);
  }
}