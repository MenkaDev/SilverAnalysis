const domainData = {
    technical: { name: "Technical & Engineering", total: 5 },
    medical: { name: "Medical & Healthcare", total: 5 },
    finance: { name: "Finance & Banking", total: 5 },
    defense: { name: "Defense & Security", total: 7 },
    marketing: { name: "Marketing & Sales", total: 10 },
    creative: { name: "Creative & Artistic", total: 7 },
    teaching: { name: "Teaching & Consultation", total: 8 },
    law: { name: "Law & Legal Services", total: 7}
};

const behaviourList = [
"Acquisitive","Active","Adjusting to a new city could be challenging","Aloof",
"Ambitious goal setting","Amiable","Argumentative","Assertive","Attention at immediate task",
"Attentive","Avoid being in the spotlight","Bossy","Calm problem-solving",
"Can face cholesterol issues","Can face indigestion","Can face kidney problems",
"Communicative","Compassionate","Competitive","Confrontational","Confused",
"Conservative","Consistent efforts","Creative thinking","Critical thinking",
"Decision making","Dependant","Detail oriented","Determined","Diligent",
"Direct communication style","Discipline","Disorganised","Distracted","Dominant",
"Driven mindset","Easily stressed","Emotional suppression","Empathetic",
"Expressive behaviour","Extrovert","Face irregular sleep patterns","Fast learner",
"Fear of rejection","Firm mindset","Flexible","Food sensitivity",
"Friendly with new people","Goal clarity","Goal-driven approach",
"Hardworking","Health-sensitive","High ambition","High emotional sensitivity",
"High empathy","High expectations from self","High risk-taking tendency",
"Honest","Hyperactive thoughts","Imaginative","Impulsive decisions",
"Inability to focus on one thing","Insecure","Introverted","Irritable",
"Judgemental","Kind behaviour","Lack of interest","Lazy nature",
"Leadership qualities","Logical thinking","Low confidence","Low persistence",
"Low patience","Low self-esteem","Meticulous","Mindful decisions",
"Motivated","Multi-tasking ability","Negative thought patterns",
"Neutral","Open communication","Optimistic","Organised","Over-emotional",
"Overthinking","Overwhelmed easily","Patient","People pleasing",
"Perfectionism","Persistent","Physical restlessness","Polite",
"Poor time management","Practical thinking","Quiet nature","Reliability",
"Reserved","Responsible","Risk-averse","Risk-taker","Rude behaviour",
"Scattered thoughts","Self-aware","Self-driven","Self-motivated","Sensitive",
"Short-tempered","Silent treatment tendency","Slow decision making",
"Social behaviour","Social discomfort","Socially adaptable","Spontaneous",
"Stable mindset","Stressed","Strong mindset","Talkative",
"Task avoidance","Teamwork","Thoughtful","Uncertain behaviour",
"Unexpressive","Very emotional"
];

const strengthList = [
"Address issues in healthy way","Admirable","Adaptive","Ambitious",
"Artistic strengths","Bold personality","Brave","Calm",
"Clarity of goals","Committed","Compassion","Confidence","Consistent",
"Courageous","Creative mind","Critical thinking","Dedicated",
"Discipline","Emotional intelligence","Focused","Goal oriented",
"Good listener","Hardworking","Healthy decision making",
"Healthy boundaries","High determination","Honest nature","Innovative",
"Leadership","Logical approach","Loyal",
"Mature decision making","Mindful","Motivated","Open-minded",
"Organised","Positive mindset"," Practical approach",
"Problem solving","Resilient","Respectful behaviour","Responsible",
"Self-awareness","Self-control","Self-driven","Self-motivated",
"Smart work","Stable mindset","Strategic thinking",
"Strong communication","Strong willpower","Supportive","Thoughtful",
"Time management","Understanding","Visionary thinking"
];

const weaknessList = [
"Aggressive","Anxious","Avoidant behaviour","Clingy nature",
"Closed minded","Comparing yourself","Compulsive behaviour",
"Confused decisions","Controlling nature","Daydreaming","Dependency",
"Difficulty trusting others","Disorganised behaviour","Easily distracted",
"Ego issues","Emotional suppression","Fearful behaviour","Fear of failure",
"Feeling lost","Forgetful","Frustrated easily","Hesitant",
"High sensitivity","Hyperactive thoughts","Impatience","Impulsive",
"Insecure","Jealousy","Judgemental nature","Lack of discipline",
"Lack of focus","Lack of patience","Lack of planning","Lazy tendencies",
"Low confidence","Low self-esteem","Mood swings","Negative thinking",
"Overthinking","Overwhelmed","People pleasing behaviour",
"Perfectionist pressure","Poor boundaries","Poor decision making",
"Poor emotional regulation","Poor time management",
"Procrastination","Rigid mindset","Risk aversion","Scattered attention",
"Self-doubt","Self-sabotage","Sensitive to criticism",
"Stress mismanagement","Uncertain behaviour","Under-confident",
"Unexpressive","Validation seeking"
];

let careerDomains = [];
let recommendedDomain = null;

// ==================== LOCALSTORAGE FUNCTIONS ====================

function saveToLocalStorage() {
    const formData = {
        // Basic user info
        userName: document.getElementById('userName')?.value || '',
        userAge: document.getElementById('userAge')?.value || '',
        userEducation: document.getElementById('userEducation')?.value || '',
        reportDate: document.getElementById('reportDate')?.value || '',
        currentJobTitle: document.getElementById('currentJobTitle')?.value || '',
        govJobSuitabilityLevel: document.getElementById('govJobSuitabilityLevel')?.value || '',
        businessSuitabilityLevel: document.getElementById('businessSuitabilityLevel')?.value || '',
        
        // Analysis fields
        strengths: document.getElementById('strengths')?.value || '',
        weaknesses: document.getElementById('weaknesses')?.value || '',
        currentJob: document.getElementById('currentJob')?.value || '',
        govJobSuitability: document.getElementById('govJobSuitability')?.value || '',
        businessPossibility: document.getElementById('businessPossibility')?.value || '',
        overallRecommendation: document.getElementById('overallRecommendation')?.value || '',
        
        // Pointer fields
        currJobSuitabilityPointers: document.getElementById('currJobSuitabilityPointers')?.value || '',
        govJobSuitabilityPointers: document.getElementById('govJobSuitabilityPointers')?.value || '',
        businessSuitabilityPointers: document.getElementById('businessSuitabilityPointers')?.value || '',
        
        // Career domains
        careerDomains: careerDomains,
        recommendedDomain: recommendedDomain,
        
        // Checkboxes
        checkboxes: Array.from(document.querySelectorAll('input[type="checkbox"]'))
            .map(cb => ({ id: cb.id, checked: cb.checked }))
            .filter(item => item.id),
        
        // Images (base64)
        signatureImage: document.getElementById('r_signature_img')?.src || '',
        handwritingImage: document.getElementById('r_handwriting_img')?.src || '',
        
        // Timestamp
        savedAt: new Date().toISOString()
    };
    
    try {
        localStorage.setItem('careerAnalysisData', JSON.stringify(formData));
        console.log('Data saved successfully');
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        alert('Error saving data. Your browser storage might be full.');
        return false;
    }
}

function loadFromLocalStorage() {
    try {
        const savedData = localStorage.getItem('careerAnalysisData');
        if (!savedData) {
            console.log('No saved data found');
            return false;
        }
        
        const formData = JSON.parse(savedData);
        
        // Restore basic user info
        if (formData.userName) document.getElementById('userName').value = formData.userName;
        if (formData.userAge) document.getElementById('userAge').value = formData.userAge;
        if (formData.userEducation) document.getElementById('userEducation').value = formData.userEducation;
        if (formData.reportDate) document.getElementById('reportDate').value = formData.reportDate;
        if (formData.currentJobTitle) document.getElementById('currentJobTitle').value = formData.currentJobTitle;
        if (formData.govJobSuitabilityLevel) document.getElementById('govJobSuitabilityLevel').value = formData.govJobSuitabilityLevel;
        if (formData.businessSuitabilityLevel) document.getElementById('businessSuitabilityLevel').value = formData.businessSuitabilityLevel;
        
        // Restore analysis fields
        if (formData.strengths) document.getElementById('strengths').value = formData.strengths;
        if (formData.weaknesses) document.getElementById('weaknesses').value = formData.weaknesses;
        if (formData.currentJob) document.getElementById('currentJob').value = formData.currentJob;
        if (formData.govJobSuitability) document.getElementById('govJobSuitability').value = formData.govJobSuitability;
        if (formData.businessPossibility) document.getElementById('businessPossibility').value = formData.businessPossibility;
        if (formData.overallRecommendation) document.getElementById('overallRecommendation').value = formData.overallRecommendation;
        
        // Restore pointer fields
        if (formData.currJobSuitabilityPointers) document.getElementById('currJobSuitabilityPointers').value = formData.currJobSuitabilityPointers;
        if (formData.govJobSuitabilityPointers) document.getElementById('govJobSuitabilityPointers').value = formData.govJobSuitabilityPointers;
        if (formData.businessSuitabilityPointers) document.getElementById('businessSuitabilityPointers').value = formData.businessSuitabilityPointers;
        
        // Restore career domains
        if (formData.careerDomains) {
            careerDomains = formData.careerDomains;
            recommendedDomain = formData.recommendedDomain;
            displayCareerDomains();
        }
        
        // Restore checkboxes
        if (formData.checkboxes) {
            formData.checkboxes.forEach(item => {
                const checkbox = document.getElementById(item.id);
                if (checkbox) checkbox.checked = item.checked;
            });
        }
        
        // Restore images
        if (formData.signatureImage && formData.signatureImage.startsWith('data:')) {
            document.getElementById('r_signature_img').src = formData.signatureImage;
            document.getElementById('r_signature_img').style.display = 'block';
            document.getElementById('r_signature_placeholder').style.display = 'none';
        }
        
        if (formData.handwritingImage && formData.handwritingImage.startsWith('data:')) {
            document.getElementById('r_handwriting_img').src = formData.handwritingImage;
            document.getElementById('r_handwriting_img').style.display = 'block';
            document.getElementById('r_handwriting_placeholder').style.display = 'none';
        }
        
        // Update preview
        updatePreview();
        
        console.log('Data loaded successfully');
        return true;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return false;
    }
}

function clearLocalStorage() {
    if (confirm('Are you sure you want to clear all saved data? This cannot be undone.')) {
        localStorage.removeItem('careerAnalysisData');
        console.log('LocalStorage cleared');
        alert('All saved data has been cleared.');
    }
}

// ==================== EXISTING FUNCTIONS (MODIFIED) ====================

function initializeDate() {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    document.getElementById('reportDate').value = formattedDate;
}

function toggleCategory(element) {
    const category = element.parentElement;
    category.classList.toggle('collapsed');
}

function calculateHandwritingScore(domain) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    let score = 0;
    let total = domainData[domain].total;
    let maxTotal = Math.max(...Object.values(domainData).map(d => d.total));

    checkboxes.forEach(checkbox => {
        const domains = checkbox.getAttribute('data-domains').split(',');
        if (domains.includes(domain)) {
            score++;
        }
    });

    if (total === 0) return 0;
    let normalized = score / total;
    let weight = Math.sqrt(total / maxTotal);
    return normalized * weight * 100;
}

function updateCareerRecommendations() {
    const handwritingResults = [];
    
    Object.keys(domainData).forEach(domain => {
        const handwritingScore = calculateHandwritingScore(domain);
        handwritingResults.push({
            domain: domain,
            name: domainData[domain].name,
            score: handwritingScore
        });
    });
    
    handwritingResults.sort((a, b) => b.score - a.score);
    const topHandwriting = handwritingResults.filter(result => result.score > 0).slice(0, 3);
    
    careerDomains = topHandwriting;
    displayCareerDomains();
    updatePreview();
    saveToLocalStorage(); // Auto-save
}

function displayCareerDomains() {
    const container = document.getElementById('career-domains-container');
    
    if (careerDomains.length === 0) {
        container.innerHTML = '<div class="empty-state">Complete the handwriting quiz to see career recommendations</div>';
        return;
    }

    let html = '';
    careerDomains.forEach((career, index) => {
        const isRecommended = recommendedDomain === career.domain;
        
        if (!career.hasOwnProperty('graphologicalPointers')) {
            career.graphologicalPointers = "";
        }
        
        html += `
            <div class="career-domain ${isRecommended ? 'recommended' : ''}">
                <div class="career-domain-header">
                    <span class="career-domain-title">${index + 1}.</span>
                </div>
                <div class="form-group">
                    <label>Career Domain Name</label>
                    <input type="text" id="career-name-${index}" value="${career.name}" placeholder="Enter career domain name" onchange="updateCareerName(${index}, this.value)">
                </div>
                <div class="form-group">
                    <label>Match Percentage</label>
                    <input type="number" id="career-score-${index}" value="${career.score.toFixed(1)}" min="0" max="100" step="0.1" placeholder="Enter percentage" onchange="updateCareerScore(${index}, this.value)">
                </div>
                
                <div class="form-group">
                    <label>Niche Domains</label>
                    <textarea 
                        id="niche-${career.domain}" 
                        rows="3"
                        placeholder="Enter niche domains (press Enter for a new line)"
                        onchange="updateNicheDomains(${index}, this.value)"
                        onblur="updateNicheDomains(${index}, this.value)"
                    >${career.nicheDomains || ''}</textarea>
                </div>

                <div class="form-group">
                    <label>Graphological Pointers</label>
                    <textarea 
                        id="graphological-${index}" 
                        placeholder="Add graphological pointers for this career domain..."
                        onchange="updateGraphologicalPointers(${index}, this.value)"
                        onblur="updateGraphologicalPointers(${index}, this.value)"
                    >${career.graphologicalPointers || ''}</textarea>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function updateGraphologicalPointers(index, value) {
    if (careerDomains[index]) {
        careerDomains[index].graphologicalPointers = value;
        updatePreview();
        saveToLocalStorage(); // Auto-save
    }
}

function updateNicheDomains(index, value) {
    if (careerDomains[index]) {
        careerDomains[index].nicheDomains = value;
        updatePreview();
        saveToLocalStorage(); // Auto-save
    }
}

function updateCareerName(index, newName) {
    if (careerDomains[index]) {
        careerDomains[index].name = newName;
        updatePreview();
        saveToLocalStorage(); // Auto-save
    }
}

function updateCareerScore(index, newScore) {
    if (careerDomains[index]) {
        careerDomains[index].score = parseFloat(newScore) || 0;
        updatePreview();
        saveToLocalStorage(); // Auto-save
    }
}

function selectRecommended(domain) {
    recommendedDomain = domain;
    displayCareerDomains();
    updatePreview();
    saveToLocalStorage(); // Auto-save
}

function updatePreview() {
    document.getElementById('r_user_name').textContent = document.getElementById('userName').value || 'Not provided';
    document.getElementById('r_user_age').textContent = document.getElementById('userAge').value || 'Not provided';
    document.getElementById('r_user_education').textContent = document.getElementById('userEducation').value || 'Not provided';
    document.getElementById('r_report_date').textContent = document.getElementById('reportDate').value || 'Not provided';
    document.getElementById('r_current_job_title').textContent = document.getElementById('currentJobTitle').value || 'Not provided';
    document.getElementById('r_gov_job_suitability_level').textContent = document.getElementById('govJobSuitabilityLevel').value || 'Not Provided';
    document.getElementById('r_business_suitability_level').textContent = document.getElementById('businessSuitabilityLevel').value || 'Not Provided';

    const clientName = document.getElementById('userName').value || 'our client';
    document.getElementsByName('r_client_name').forEach(el => {
        el.textContent = clientName;
    });

    updateKeywordTags('strengths', 'r_strengths_tags');
    updateKeywordTags('weaknesses', 'r_weaknesses_tags');
    updateCareerRecommendationsPreview();
    updateAnalysisSection('currentJob', 'r_current_job_compatibility');
    updateAnalysisSection('govJobSuitability', 'r_gov_job_analysis');
    updateAnalysisSection('businessPossibility', 'r_business_analysis');
    updateAnalysisSection('overallRecommendation', 'r_overall_recommendation');
}

function updateKeywordTags(inputId, previewId) {
    const input = document.getElementById(inputId).value;
    const preview = document.getElementById(previewId);

    if (!input.trim()) {
        const label = inputId === 'strengths' ? 'strengths' : 'development areas';
        preview.innerHTML = `<div class="empty-state">No ${label} provided</div>`;
        return;
    }

    const keywords = input.split(/[\n,]+/).map(k => k.trim()).filter(k => k);
    const html = keywords.map(keyword => `<span class="keyword-tag">${keyword}</span>`).join('');
    preview.innerHTML = html;
}

function updateAnalysisSection(inputId, previewId) {
    const input = document.getElementById(inputId).value;
    const preview = document.getElementById(previewId);

    if (!input.trim()) {
        preview.innerHTML = '<div class="empty-state">No analysis provided. Please complete the assessment form for detailed insights.</div>';
        return;
    }

    const lines = input
        .split(/\r?\n+/)
        .map(line => line.trim())
        .filter(line => line.length > 0);

    const html = `<ul>${lines.map(line => `<li>${line}</li>`).join('')}</ul>`;
    preview.innerHTML = html;
}

function updateCareerRecommendationsPreview() {
    const preview = document.getElementById('r_career_recommendations');
    
    if (careerDomains.length === 0) {
        preview.innerHTML = '<div class="empty-state">Complete the handwriting analysis quiz to see personalized career recommendations</div>';
        return;
    }

    let html = '<div class="career-recommendations-container">';
    careerDomains.forEach((career, index) => {
        const nicheInput = document.getElementById(`niche-${career.domain}`);
        let niches = nicheInput ? nicheInput.value.trim() : '';
        const isRecommended = recommendedDomain === career.domain;

        let bulletList = "";
        if (niches) {
            const nicheArray = niches
                .split(/\n+/)
                .map(item => item.trim())
                .filter(item => item.length > 0);
                
            if (nicheArray.length > 0) {
                bulletList = nicheArray.map(item => `<li>${item}</li>`).join('');
            }
        }

        let graphologicalDisplay = "";
        if (career.graphologicalPointers && career.graphologicalPointers.trim() !== '') {
            graphologicalDisplay = `
                <div class="graphological-pointers">
                    <div class="pointers-label">Graphological Pointers:</div>
                    <div class="pointers-content">${career.graphologicalPointers}</div>
                </div>
            `;
        }

        html += `
            <div class="career-item ${isRecommended ? 'recommended' : ''}">
                <div class="career-main-content">
                    <div class="career-header">
                        <strong class="career-name">${index + 1}. ${career.name}</strong>
                        ${isRecommended ? '<span class="recommended-star">★</span>' : ''}
                        <div class="career-score"><b>Match:</b> ${career.score.toFixed(1)}%</div>
                    </div>
                    ${bulletList ? `
                    <div class="career-niches-section">
                        <em class="niches-label">Specializations:</em>
                        <ul class="bullet-list">${bulletList}</ul>
                    </div>
                    ` : ''}
                </div>
                ${graphologicalDisplay}
            </div>
        `;
    });
    html += '</div>';

    preview.innerHTML = html;
}

function handleImageUpload(inputId, imgId, placeholderId) {
    const input = document.getElementById(inputId);
    const img = document.getElementById(imgId);
    const placeholder = document.getElementById(placeholderId);
    
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result;
                img.style.display = 'block';
                placeholder.style.display = 'none';
                saveToLocalStorage(); // Auto-save when image uploaded
            };
            reader.readAsDataURL(file);
        } else {
            img.style.display = 'none';
            placeholder.style.display = 'block';
        }
    });
}

function downloadPDF() {
    // Save data before downloading
    saveToLocalStorage();
    
    const { jsPDF } = window.jspdf;
    
    if (!jsPDF) {
        alert('PDF library not loaded. Please try again.');
        return;
    }

    const element = document.getElementById('reportRoot');
    const userName = document.getElementById('userName').value || 'Career_Analysis';
    
    html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        
        let position = 0;
        
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        const filename = `Career_Analysis_Report_${userName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(filename);
    }).catch(error => {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
    });
}

function resetForm() {
    if (confirm('Are you sure you want to reset all fields? This action cannot be undone.')) {
        document.querySelectorAll('input[type="text"], input[type="number"], textarea').forEach(input => {
            if (input.id !== 'reportDate' && input.id !== 'reportId') {
                input.value = '';
            }
        });
        
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        document.querySelectorAll('input[type="file"]').forEach(fileInput => {
            fileInput.value = '';
        });
        
        document.getElementById('r_signature_img').style.display = 'none';
        document.getElementById('r_signature_placeholder').style.display = 'block';
        document.getElementById('r_handwriting_img').style.display = 'none';
        document.getElementById('r_handwriting_placeholder').style.display = 'block';
        
        careerDomains = [];
        recommendedDomain = null;
        
        displayCareerDomains();
        updatePreview();
        saveToLocalStorage(); // Save cleared state
    }
}

async function runLLM(type) {
    let inputId = "";
    let outputId = "";
    let templateId = "";
    let loaderId = "";
    
    if (type === "CURRENT") {
        inputId = "currJobSuitabilityPointers";
        outputId = "currentJob";
        loaderId = "currentLoader";
        buttonId = "currentBtn";
        templateId = "current_job_template";
    }
    if (type === "GOV") {
        inputId = "govJobSuitabilityPointers";
        outputId = "govJobSuitability";
        loaderId = "govLoader";
        buttonId = "govBtn";
        templateId = "government_job_template"; 
    }
    if (type === "BUSINESS") {
        inputId = "businessSuitabilityPointers";
        outputId = "businessPossibility";
        loaderId = "businessLoader";
        buttonId = "businessBtn";
        templateId = "business_viability_template"; 
    }
    
    document.getElementById(loaderId).style.display = "inline-block";
    document.getElementById(buttonId).classList.add("disabled");
    
    const text = document.getElementById(inputId).value.trim();
    if (!text) {
        alert("Please enter some details before generating.");
        document.getElementById(loaderId).style.display = "none";
        document.getElementById(buttonId).classList.remove("disabled");
        return;
    }

    let targetURL = "";
    let apiKey = "";
    const currHost = window.location.hostname;
    
    if (currHost == "menkadev.github.io") {
        targetURL = "https://exploreemebackend-1056855884926.us-central1.run.app";
        apiKey = "ek8pfnyVmlvvjyKGf665rhHpioob2hrORjw0BxwH";
    } else {
        targetURL = "http://127.0.0.1:8000";
        apiKey = "yhW10OA9omHFZS9nrcKfNJhhXM6umfpCWpScxkWx";
    }
    
    const fetchRes = await fetch(`${targetURL}/ai_automations_handler/fetch-data/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": apiKey },
        body: JSON.stringify({
            template_id: templateId,
            pointers: text
        }),
    });

    const fetchData = await fetchRes.json();

    const llmRes = await fetch(`${targetURL}/ai_automations_handler/process-llm/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": apiKey },
        body: JSON.stringify({
            system_template: fetchData.system_template,
            pointers: fetchData.pointers
        }),
    });

    const llmData = await llmRes.json();

    document.getElementById(loaderId).style.display = "none";
    document.getElementById(buttonId).classList.remove("disabled");
    document.getElementById(outputId).value = llmData.output;
    updatePreview();
    saveToLocalStorage(); // Auto-save after LLM response
}

const traitCategories = {
    behaviour: behaviourList,
    strength: strengthList,
    weakness: weaknessList
};

function setupTagInput(inputId, dropdownId, tagContainerId, sourceList) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    const tagContainer = document.getElementById(tagContainerId);

    let tags = [];

    function renderTags() {
        tagContainer.innerHTML = "";

        tags.forEach((tag, index) => {
            const el = document.createElement("div");
            el.className = "tag";
            el.innerHTML = `${tag} <span class="tag-remove" data-i="${index}">×</span>`;
            tagContainer.appendChild(el);
        });

        const hiddenFieldId = inputId === "strengthsInput" ? "strengths" : "weaknesses";
        document.getElementById(hiddenFieldId).value = tags.join(", ");

        updatePreview();
        saveToLocalStorage(); // Auto-save
    }

    input.addEventListener("keyup", (e) => {
        const value = input.value.trim();

        if (e.key === "Enter" && value !== "") {
            tags.push(value);
            input.value = "";
            renderTags();
            dropdown.style.display = "none";
            return;
        }

        if (value.length === 0) {
            dropdown.style.display = "none";
            return;
        }

        const results = sourceList
            .filter(item => item.toLowerCase().includes(value.toLowerCase()))
            .slice(0, 5);

        dropdown.innerHTML = results.map(r => `<div class="dropdown-item">${r}</div>`).join("");
        dropdown.style.display = "block";
    });

    dropdown.addEventListener("click", (e) => {
        if (e.target.classList.contains("dropdown-item")) {
            tags.push(e.target.textContent);
            input.value = "";
            dropdown.style.display = "none";
            renderTags();
        }
    });

    tagContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("tag-remove")) {
            const index = parseInt(e.target.dataset.i);
            tags.splice(index, 1);
            renderTags();
        }
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && input.value === "" && tags.length > 0) {
            tags.pop();
            renderTags();
        }
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load saved data first
    loadFromLocalStorage();
    
    // Initialize date if not loaded
    if (!document.getElementById('reportDate').value) {
        initializeDate();
    }
    
    // Add listeners to all form inputs for real-time preview updates AND auto-save
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"], textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            updatePreview();
            saveToLocalStorage(); // Auto-save on input
        });
    });

    // Add listeners to checkboxes for handwriting analysis
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateCareerRecommendations();
            saveToLocalStorage(); // Auto-save on checkbox change
        });
    });

    // Setup image upload handlers
    handleImageUpload('signatureUpload', 'r_signature_img', 'r_signature_placeholder');
    handleImageUpload('handwritingUpload', 'r_handwriting_img', 'r_handwriting_placeholder');
    setupTagInput("strengthsInput", "strengthsDropdown", "strengthsTagContainer", strengthList);
    setupTagInput("weaknessesInput", "weaknessesDropdown", "weaknessesTagContainer", weaknessList);

    // Initialize preview
    updatePreview();
    
    console.log('Form initialized with localStorage support');
});