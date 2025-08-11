async function loadContent(lang) {
    const response = await fetch(`./lang/${lang}.json`);
    const data = await response.json();

    setDocumentMetadata(data, lang);
    populateHeader(data.header);
    populateSections(data);
    populateFooter(data.footer);
}

function setDocumentMetadata(data, lang) {
    document.title = data.title;
    document.documentElement.setAttribute('lang', lang);
}

function populateHeader(header) {
    document.getElementById('iname').textContent = header.name;
    document.getElementById('iinfo').textContent = header.info;
    document.getElementById('iemail-link').textContent = header.email;
    document.getElementById('igithub-link').textContent = header.githubText;
    document.getElementById('ilinkedin-link').textContent = header.linkedinText;
}

function populateSections(data) {
    populateAboutSection(data.about);
    populateStackSection(data.stack);
    populateExperienceSection(data.experience);
    populateGraduationSection(data.graduation);
    populateEducationSection(data.education);
}

function populateAboutSection(about) {
    document.getElementById('iabout-title').textContent = about.title;
    document.getElementById('iabout-text').textContent = about.text;
}

function populateStackSection(stack) {
    document.getElementById('istack-title').textContent = stack.title;
    const skillsContainer = document.getElementById('iskills-container');
    skillsContainer.innerHTML = '';
    stack.skills.forEach(({ skill, level, percentage }) => {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill';
        skillDiv.innerHTML = `
            <span class="skill-name">${skill}</span>
            <div class="skill-bar">
                <div class="skill-bar-fill" style="width: ${percentage}%;">
                    <span class="skill-level">${level}</span>
                </div>
            </div>
        `;
        skillsContainer.appendChild(skillDiv);
    });
}

function populateExperienceSection(experience) {
    document.getElementById('iexperience-title').textContent = experience.title;
    document.getElementById('iexp-project1-title').textContent = experience.project1.title;
    document.getElementById('iexp-project1-text').textContent = experience.project1.text;
    document.getElementById('iexp-project2-title').textContent = experience.project2.title;
    document.getElementById('iexp-project2-text').textContent = experience.project2.text;
}

function populateGraduationSection(graduation) {
    document.getElementById('igraduation-title').textContent = graduation.title;
    document.getElementById('igraduation-text').innerHTML = graduation.text;
}

function populateEducationSection(education) {
    document.getElementById('ieducation-title').textContent = education.title;

    populateCourseDetails(
        'iedu-course1-title',
        'iedu-course1-details',
        education.course1
    );

    populateCourseDetails(
        'iedu-course2-title',
        'iedu-course2-details',
        education.course2
    );
}

function populateCourseDetails(titleId, detailsId, course) {
    document.getElementById(titleId).textContent = course.title;

    const detailsContainer = document.getElementById(detailsId);
    detailsContainer.innerHTML = '';
    course.details.forEach(detail => {
        const paragraph = document.createElement('p');
        paragraph.innerHTML = detail;
        detailsContainer.appendChild(paragraph);
    });
}

function populateFooter(footer) {
    document.getElementById('ifooter').innerHTML = footer;
}

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('ilanguage-select');
    const savedLang = localStorage.getItem('language') || 'pt-BR';
    select.value = savedLang;
    loadContent(savedLang);

    select.addEventListener('change', (e) => {
        const lang = e.target.value;
        localStorage.setItem('language', lang);
        loadContent(lang);
    });
});