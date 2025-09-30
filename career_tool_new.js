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

let careerDomains = [];
let recommendedDomain = null;

// Initialize date
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
        html += `
            <div class="career-domain ${isRecommended ? 'recommended' : ''}>
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
                    <input type="text" id="niche-${career.domain}" placeholder="Enter niche domains (comma separated)" onchange="updatePreview()">
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function updateCareerName(index, newName) {
    if (careerDomains[index]) {
        careerDomains[index].name = newName;
        updatePreview();
    }
}

function updateCareerScore(index, newScore) {
    if (careerDomains[index]) {
        careerDomains[index].score = parseFloat(newScore) || 0;
        updatePreview();
    }
}

function selectRecommended(domain) {
    recommendedDomain = domain;
    displayCareerDomains();
    updatePreview();
}

function updatePreview() {
    // Update user details
    document.getElementById('r_user_name').textContent = document.getElementById('userName').value || 'Not provided';
    document.getElementById('r_user_age').textContent = document.getElementById('userAge').value || 'Not provided';
    document.getElementById('r_user_education').textContent = document.getElementById('userEducation').value || 'Not provided';
    document.getElementById('r_report_date').textContent = document.getElementById('reportDate').value || 'Not provided';
    // document.getElementById('r_report_id').textContent = document.getElementById('reportId').value || 'CAREER-2025-001';
    document.getElementById('r_current_job_title').textContent=document.getElementById('currentJobTitle').value || 'Not provided'
    document.getElementById('r_gov_job_suitability_level').textContent=document.getElementById('govJobSuitabilityLevel').value || 'Not Provided'
    document.getElementById('r_business_suitability_level').textContent=document.getElementById('businessSuitabilityLevel').value || 'Not Provided'

    
    // document.getElementById('r_current_job').textContent = document.getElementById('currentJob').value || 'Not provided';
    
    // Update client name in footer
    const clientName = document.getElementById('userName').value || 'our client';
    // document.getElementById('r_client_name').textContent = clientName;
    document.getElementsByName('r_client_name').forEach(el => {
        el.textContent = clientName;
      })

    // Update personality traits
    updateKeywordTags('strengths', 'r_strengths_tags');
    updateKeywordTags('weaknesses', 'r_weaknesses_tags');

    // Update career recommendations
    updateCareerRecommendationsPreview();

    // Update analysis sections
    
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

    const keywords = input.split(',').map(k => k.trim()).filter(k => k);
    const html = keywords.map(keyword => `<span class="keyword-tag">${keyword}</span>`).join('');
    preview.innerHTML = html;
}

function updateAnalysisSection(inputId, previewId) {
    const input = document.getElementById(inputId).value;
    const preview = document.getElementById(previewId);
    
    if (!input.trim()) {
        preview.textContent = 'No analysis provided. Please complete the assessment form for detailed insights.';
        return;
    }

    preview.textContent = input;
}

function updateCareerRecommendationsPreview() {
    const preview = document.getElementById('r_career_recommendations');
    
    if (careerDomains.length === 0) {
        preview.innerHTML = '<div class="empty-state">Complete the handwriting analysis quiz to see personalized career recommendations</div>';
        return;
    }

    let html = '';
    careerDomains.forEach((career, index) => {
        const nicheInput = document.getElementById(`niche-${career.domain}`);
        const niches = nicheInput ? nicheInput.value : '';
        const isRecommended = recommendedDomain === career.domain;
        
        html += `
            <div class="career-item ${isRecommended ? 'recommended' : ''}">
                <div class="career-info">
                    <h4>${index + 1}. ${career.name} ${isRecommended ? '<span class="recommended-star">★</span>' : ''}</h4>
                    ${niches ? `<div class="career-niches">Specializations: ${niches}</div>` : ''}
                </div>
                <div class="career-score">${career.score.toFixed(1)}%</div>
            </div>
        `;
    });

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
            };
            reader.readAsDataURL(file);
        } else {
            img.style.display = 'none';
            placeholder.style.display = 'block';
        }
    });
}

function downloadPDF() {
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
        // Reset all input fields
        document.querySelectorAll('input[type="text"], input[type="number"], textarea').forEach(input => {
            if (input.id !== 'reportDate' && input.id !== 'reportId') {
                input.value = '';
            }
        });
        
        // Reset all checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset file inputs
        document.querySelectorAll('input[type="file"]').forEach(fileInput => {
            fileInput.value = '';
        });
        
        // Reset images
        document.getElementById('r_signature_img').style.display = 'none';
        document.getElementById('r_signature_placeholder').style.display = 'block';
        document.getElementById('r_handwriting_img').style.display = 'none';
        document.getElementById('r_handwriting_placeholder').style.display = 'block';
        
        // Reset career domains
        careerDomains = [];
        recommendedDomain = null;
        
        // Update displays
        displayCareerDomains();
        updatePreview();
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize date
    initializeDate();
    
    // Add listeners to all form inputs for real-time preview updates
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"], textarea');
    inputs.forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    // Add listeners to checkboxes for handwriting analysis
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateCareerRecommendations);
    });

    // Setup image upload handlers
    handleImageUpload('signatureUpload', 'r_signature_img', 'r_signature_placeholder');
    handleImageUpload('handwritingUpload', 'r_handwriting_img', 'r_handwriting_placeholder');

    // Initialize preview
    updatePreview();
});