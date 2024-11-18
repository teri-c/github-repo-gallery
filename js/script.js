// Div where profile information will appear
const profileInfo = document.querySelector(".overview");
// Ul to display the repos list
const repoList = document.querySelector(".repo-list");
// Section where ALL the repo info appears
const repoInfoSection = document.querySelector(".repos");
// Section where the individual repo data appears
const repoDataSection = document.querySelector(".repo-data");

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

// Click event for the UL repo list
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepoInfo(repoName);
    }
}); 

// Function to get specific repo info
const specificRepoInfo = async function (repoName) {
    const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await res.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];

    for (let key in languageData) {
        languages.push(key);
    }
    console.log(languages);

    displaySpecificRepoInfo(repoInfo, languages);
};

// Function to display the specific repo info
const displaySpecificRepoInfo = function (repoInfo, languages) {
    repoDataSection.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoDataSection.append(div);
    repoDataSection.classList.remove("hide");
    repoInfoSection.classList.add("hide");
};