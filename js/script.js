// Div where profile information will appear
const profileInfo = document.querySelector(".overview");

const username = "teri-c";

// Fetch API JSON Data
const getProfile = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const userProfile = await res.json();
    //console.log(userProfile);

    displayUserInfo(userProfile);
};

getProfile();

// Function to fetch and display user information
const displayUserInfo = function (userProfile) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
        <img alt="user avatar" src=${userProfile.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${userProfile.name}</p>
        <p><strong>Bio:</strong> ${userProfile.bio}</p>
        <p><strong>Location:</strong> ${userProfile.location}</p>
        <p><strong>Number of public repos:</strong> ${userProfile.public_repos}</p>
    </div>`;
    profileInfo.append(div);
};