 //Today's date
 const today = new Date();
 console.log(today);
 const options = {year:'numeric', month: 'long', day:'numeric'};
 console.log(options)
 const formattedDate = today.toLocaleDateString('en-us', options);
 console.log(formattedDate);
 document.getElementById('reportDate').value = formattedDate;


 const traitData = {
   emotional: {
     'emotional-1': 'High emotional sensitivity with mood variations - needs understanding partner',
     'emotional-2': 'Balanced emotional expression - healthy emotional processing',
     'emotional-3': 'Practical emotional approach - stable and grounded'
   },
   communication: {
     'comm-1': 'Open and expressive communicator - shares feelings easily',
     'comm-2': 'Confident communication style - comfortable expressing opinions',
     'comm-3': 'Adaptable communication - adjusts style to situation',
     'comm-4': 'Private communicator - takes time to open up',
     'comm-5': 'Thoughtful communicator - prefers quality over quantity'
   },
   conflict: {
     'conflict-1': 'Healthy conflict resolution - addresses issues constructively',
     'conflict-2': 'Peaceful approach to disagreements - avoids confrontation',
     'conflict-3': 'Quick to anger - may need anger management techniques',
     'conflict-4': 'Open to feedback - willing to consider different perspectives',
     'conflict-5': 'Tendency for relationship conflicts - needs communication work',
     'conflict-6': 'Aggressive conflict style - may escalate disagreements'
   },
   intimacy: {
     'intimacy-1': 'High intimacy needs - requires close physical connection',
     'intimacy-2': 'Balanced intimacy needs - healthy physical relationship approach',
     'intimacy-3': 'Lower intimacy needs - values emotional over physical connection'
   },
   family: {
     'family-1': 'Strong family identity - family influences major decisions',
     'family-2': 'Family-dominated decision making - may struggle with independence',
     'family-3': 'Family-first mentality - prioritizes family over individual needs',
     'family-4': 'Balanced family-individual identity - healthy boundaries',
     'family-5': 'Independent identity - makes decisions autonomously',
     'family-6': 'Family-personal conflict - struggles between family and personal values'
   },
   financial: {
     'financial-1': 'Impulsive spending patterns - may need budgeting support',
     'financial-2': 'Balanced financial approach - saves and spends appropriately',
     'financial-3': 'Conservative with money - excellent saving habits'
   }
 };

 function handleImageUpload(input, type) {
   const file = input.files[0];
   if (file) {
     const reader = new FileReader();
     reader.onload = function(e) {
       const previewDiv = document.getElementById(`${type}Preview`);
       previewDiv.innerHTML = `<img src="${e.target.result}" style="max-width: 200px; max-height: 100px; border-radius: 4px;" alt="${type}">`;
     };
     reader.readAsDataURL(file);
   }
 }



// helper function to maintain compatibility
function getSelectedCheckboxValues(containerId) {
const container = document.getElementById(containerId);
const checkboxes = container.querySelectorAll('input[type="checkbox"]:checked');
return Array.from(checkboxes).map(cb => ({ value: cb.value, textContent: cb.nextElementSibling.textContent }));
}

async function runLLMForSection({
  inputId,
  outputId,
  loaderId,
  buttonId,
  templateId,
  afterRun
}) {
  const inputEl = document.getElementById(inputId);
  const loader = document.getElementById(loaderId);
  const button = document.getElementById(buttonId);
  const outputEl = document.getElementById(outputId);
  if (!inputEl) {
    console.error("Input not found:", inputId);
    return;
  }

  const text = inputEl.value.trim();
  if (!text) {
    alert("Please enter some input first.");
    return;
  }

  loader.style.display = "inline-block";
  button.classList.add("disabled");

  // === backend selection (same as your other tools) ===
  let targetURL = "";
  let apiKey = "";
  const host = window.location.hostname;

  if (host === "menkadev.github.io") {
    targetURL = "https://exploreemebackend-1056855884926.us-central1.run.app";
    apiKey = "ek8pfnyVmlvvjyKGf665rhHpioob2hrORjw0BxwH";
  } else {
    targetURL = "http://127.0.0.1:8000";
    apiKey = "yhW10OA9omHFZS9nrcKfNJhhXM6umfpCWpScxkWx";
  }

  try {
    // STEP 1: fetch template
    const tRes = await fetch(`${targetURL}/ai_automations_handler/fetch-data/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": apiKey
      },
      body: JSON.stringify({
        template_id: templateId,
        pointers: text
      })
    });

    const tData = await tRes.json();

    // STEP 2: run LLM
    const llmRes = await fetch(`${targetURL}/ai_automations_handler/process-llm/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": apiKey
      },
      body: JSON.stringify({
        system_template: tData.system_template,
        pointers: tData.pointers
      })
    });

    const llmData = await llmRes.json();

    if (outputEl) {
  outputEl.value = llmData.output;
}

    // 🔥 FORCE PREVIEW UPDATE
    if (typeof afterRun === "function") {
      afterRun();
    }

  } catch (err) {
    console.error("LLM error:", err);
    alert("Something went wrong while generating text.");
  } finally {
    loader.style.display = "none";
    button.classList.remove("disabled");
  }
}
function generateEmotional() {
  runLLMForSection({
    inputId: "emotional_input",
    outputId: "emotional_text", // not strictly needed, but fine
    loaderId: "emotional_loader",
    buttonId: "emotional_btn",
    templateId: "EMOTIONAL_TEMPLATE",
    afterRun: applyToPreview
  });
}
function generateCommunication() {
  runLLMForSection({
    inputId: "communication_input",
    outputId: "communication_text", // not strictly needed, but fine
    loaderId: "communication_loader",
    buttonId: "communication_btn",
    templateId: "COMMUNICATION_TEMPLATE",
    afterRun: applyToPreview
  });
}
function generateConflict() {
  runLLMForSection({
    inputId: "conflict_input",
    outputId: "conflict_text", // not strictly needed, but fine
    loaderId: "conflict_loader",
    buttonId: "conflict_btn",
    templateId: "CONFLICT_TEMPLATE",
    afterRun: applyToPreview
  });
}
function generateIntimacy() {
  runLLMForSection({
    inputId: "intimacy_input",
    outputId: "intimacy_text", // not strictly needed, but fine
    loaderId: "intimacy_loader",
    buttonId: "intimacy_btn",
    templateId: "INTIMACY_TEMPLATE",
    afterRun: applyToPreview
  });
}
function generateFamily() {
  runLLMForSection({
    inputId: "family_input",
    outputId: "family_text", // not strictly needed, but fine
    loaderId: "family_loader",
    buttonId: "family_btn",
    templateId: "FAMILY_TEMPLATE",
    afterRun: applyToPreview
  });
}
function generateFinancial() {
  runLLMForSection({
    inputId: "financial_input",
    outputId: "financial_text", // not strictly needed, but fine
    loaderId: "financial_loader",
    buttonId: "financial_btn",
    templateId: "FINANCIAL_TEMPLATE",
    afterRun: applyToPreview
  });
}
function generateStrengths() {
  runLLMForSection({
    inputId: "strengths_input",
    outputId: "relationshipStrengths",
    loaderId: "strengths_loader",
    buttonId: "strengths_btn",
    templateId: "STRENGTHS_TEMPLATE2",
    afterRun: applyToPreview
  });
}

function generateGrowth() {
  runLLMForSection({
    inputId: "growth_input",
    outputId: "areasForGrowth",
    loaderId: "growth_loader",
    buttonId: "growth_btn",
    templateId: "CHALLENGES_TEMPLATE2",
    afterRun: applyToPreview
  });
}

function generateCompatibility() {
  runLLMForSection({
    inputId: "compat_input",
    outputId: "compatibilitySummary",
    loaderId: "compat_loader",
    buttonId: "compat_btn",
    templateId: "SUMMARY_TEMPLATE",
    afterRun: applyToPreview
  });
}
// updateCompatibility function 
function updateCompatibility() {
const compatibleList = document.getElementById('r_compatible_list');
const incompatibleList = document.getElementById('r_incompatible_list');

const compatible = [];
const incompatible = [];

// Get selected checkbox values for each category
const emotionalValues = getSelectedCheckboxValues('emotionalSelect').map(item => item.value);
const communicationValues = getSelectedCheckboxValues('communicationSelect').map(item => item.value);
const conflictValues = getSelectedCheckboxValues('conflictSelect').map(item => item.value);

// Emotional compatibility
if (emotionalValues.includes('emotional-3')) {
 compatible.push('Partners who value emotional stability and practical approaches');
 incompatible.push('Highly emotional or dramatic personalities');
}
if (emotionalValues.includes('emotional-1')) {
 compatible.push('Understanding partners who can handle mood variations');
 incompatible.push('Partners who need constant emotional consistency');
}

// Communication compatibility
if (communicationValues.includes('comm-1') || communicationValues.includes('comm-2')) {
 compatible.push('Open communicators who enjoy sharing and discussion');
 incompatible.push('Very private or reserved individuals');
}
if (communicationValues.includes('comm-4') || communicationValues.includes('comm-5')) {
 compatible.push('Respectful partners who understand need for privacy');
 incompatible.push('Partners who need constant communication and sharing');
}

// Conflict resolution compatibility
if (conflictValues.includes('conflict-1') || conflictValues.includes('conflict-2')) {
 compatible.push('Peaceful partners who prefer calm discussion');
 incompatible.push('Aggressive or confrontational personalities');
}
if (conflictValues.includes('conflict-3') || conflictValues.includes('conflict-6')) {
 compatible.push('Strong personalities who can handle direct communication');
 incompatible.push('Sensitive individuals who avoid confrontation');
}

// Default messages if no traits selected
if (compatible.length === 0) {
 compatible.push('Select personality traits to see compatibility analysis');
}
if (incompatible.length === 0) {
 incompatible.push('Select personality traits to see potential challenges');
}

compatibleList.innerHTML = compatible.map(item => `<li>${item}</li>`).join('');
incompatibleList.innerHTML = incompatible.map(item => `<li>${item}</li>`).join('');
}




 function applyToPreview() {
  // Update basic info
  document.getElementById('r_name').textContent = document.getElementById('userName').value;
  document.getElementById('r_age').textContent = document.getElementById('userAge').value;
  document.getElementById('r_date').textContent = document.getElementById('reportDate').value;
  document.getElementById('r_id').textContent = document.getElementById('reportId').value;
  
  // Update names in multiple places
  document.getElementById('r_compat_name').textContent = document.getElementById('userName').value;
  document.getElementById('r_footer_name').textContent = document.getElementById('userName').value;

  // Update images
  const signatureFile = document.getElementById('uploadSignature').files[0];
  const handwritingFile = document.getElementById('uploadHandwriting').files[0];
  
  if (signatureFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('r_signature_img').src = e.target.result;
      document.getElementById('r_signature_img').style.display = 'block';
      document.getElementById('r_signature_placeholder').style.display = 'none';
    };
    reader.readAsDataURL(signatureFile);
  }

  if (handwritingFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('r_handwriting_img').src = e.target.result;
      document.getElementById('r_handwriting_img').style.display = 'block';
      document.getElementById('r_handwriting_placeholder').style.display = 'none';
    };
    reader.readAsDataURL(handwritingFile);
  }

  // Update trait analyses
  updateTraitAnalyses();
  updateCompatibility();

  // ✅ Helper function to format textarea input as bullet points
  const formatAsBullets = (text) => {
    if (!text.trim()) return '<div class="empty-state">No information provided</div>';
    const lines = text.split(/\n+/).map(line => line.trim()).filter(line => line);
    if (lines.length > 1) {
      return `<ul>${lines.map(line => `<li>${line}</li>`).join('')}</ul>`;
    }
    return `<p>${lines[0]}</p>`;
  };

  // ✅ Automatically apply to all textarea–preview pairs
  const mappings = [
    ['emotional_text', 'r_emotional_text'],
    ['communication_text', 'r_communication_text'],
    ['conflict_text', 'r_conflict_text'],
    ['intimacy_text', 'r_intimacy_text'],
    ['family_text', 'r_family_text'],
    ['financial_text', 'r_financial_text'],
    ['relationshipStrengths', 'r_strengths'],
    ['areasForGrowth', 'r_growth'],
    ['compatibilitySummary', 'r_compatibility']
  ];

  mappings.forEach(([inputId, previewId]) => {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    if (input && preview) {
      preview.innerHTML = formatAsBullets(input.value);
    }
  });
}








 // function updateTraitAnalyses() 
 function updateTraitAnalyses() {
 const categories = [
 { containerId: 'emotionalSelect', listId: 'r_emotional_list', dataKey: 'emotional' },
 { containerId: 'communicationSelect', listId: 'r_communication_list', dataKey: 'communication' },
 { containerId: 'conflictSelect', listId: 'r_conflict_list', dataKey: 'conflict' },
 { containerId: 'intimacySelect', listId: 'r_intimacy_list', dataKey: 'intimacy' },
 { containerId: 'familySelect', listId: 'r_family_list', dataKey: 'family' },
 { containerId: 'financialSelect', listId: 'r_financial_list', dataKey: 'financial' }
];

categories.forEach(category => {
 const selectedItems = getSelectedCheckboxValues(category.containerId);
 const list = document.getElementById(category.listId);
 
 if (selectedItems.length > 0) {
   const analyses = selectedItems.map(item => {
     const analysis = traitData[category.dataKey][item.value];
     return analysis ? `<li>${analysis}</li>` : '';
   }).filter(item => item !== '');
   
   list.innerHTML = analyses.length > 0 ? analyses.join('') : '<li>No analysis available for selected traits</li>';
 } else {
   list.innerHTML = '<li>Select traits to see analysis</li>';
 }
});
}

 function resetForm() {
   // Reset form inputs
   document.getElementById('userName').value = 'Sarah Johnson';
   document.getElementById('userAge').value = '28';
   document.getElementById('reportDate').value = 'September 13, 2025';
   document.getElementById('reportId').value = 'REL-2025-001';
   
   // Clear file inputs
   document.getElementById('uploadSignature').value = '';
   document.getElementById('uploadHandwriting').value = '';
   document.getElementById('signaturePreview').innerHTML = 'No signature uploaded';
   document.getElementById('handwritingPreview').innerHTML = 'No handwriting uploaded';
   
   // Clear select elements
   const selects = ['emotionalSelect', 'communicationSelect', 'conflictSelect', 'intimacySelect', 'familySelect', 'financialSelect'];
   selects.forEach(selectId => {
     const select = document.getElementById(selectId);
     select.selectedIndex = -1;
   });
   
   // Reset textareas
   document.getElementById('relationshipStrengths').value = 'Strong communication skills and emotional balance make this person a reliable and understanding partner.';
   document.getElementById('areasForGrowth').value = 'Working on conflict resolution strategies could enhance relationship harmony.';
   document.getElementById('compatibilitySummary').value = 'Best suited for partners who appreciate open communication and emotional stability.';
   
   // Apply reset to preview
   applyToPreview();
 }

 async function downloadPDF() {
   const { jsPDF } = window.jspdf;
   const element = document.getElementById('reportRoot');
   
   try {
     const canvas = await html2canvas(element, {
       scale: 2,
       useCORS: true,
       allowTaint: true,
       backgroundColor: '#ffffff'
     });
     
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
     
     const fileName = `Relationship_Analysis_${document.getElementById('userName').value.replace(/\s+/g, '_')}.pdf`;
     pdf.save(fileName);
   } catch (error) {
     console.error('PDF generation error:', error);
     alert('Error generating PDF. Please try again.');
   }
 }



 function previewPdf() {
   // Scroll to top of preview to show full report
   const previewArea = document.querySelector('.preview-area');
   previewArea.scrollTop = 0;
   alert('Preview is shown in the right panel. Review your report and click "Download PDF" when ready.');
 }

 // Event listeners
 document.getElementById('applyBtn').addEventListener('click', applyToPreview);
 document.getElementById('downloadPdf').addEventListener('click', downloadPDF);
 document.getElementById('previewPdf').addEventListener('click', previewPdf);
 document.getElementById('resetBtn').addEventListener('click', resetForm);

 // Image upload handlers
 document.getElementById('uploadSignature').addEventListener('change', function() {
   handleImageUpload(this, 'signature');
 });
 
 document.getElementById('uploadHandwriting').addEventListener('change', function() {
   handleImageUpload(this, 'handwriting');
 });

 // Initialize the application
 applyToPreview();