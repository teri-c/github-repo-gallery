// Div where profile information will appear
const profileInfo = document.querySelector(".overview");
// Ul to display the repos list
const repoList = document.querySelector(".repo-list");

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

    getRepos();
};

// Fetch the repos
const getRepos = async function () {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await res.json();
    console.log(repos);

    displayRepoInfo(repos);
};


// Display info about the repos
const displayRepoInfo = function (repos) {
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }

};