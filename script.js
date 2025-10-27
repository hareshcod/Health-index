let currentHealthData = null;

document.getElementById('healthForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const heartRate = parseFloat(document.getElementById('heartRate').value);
    const bloodPressure = parseFloat(document.getElementById('bloodPressure').value);
    const sleep = parseFloat(document.getElementById('sleep').value);
    const exercise = parseFloat(document.getElementById('exercise').value);
    const smoking = parseFloat(document.getElementById('smoking').value);
    
    // Calculate BMI
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    
    // BMI Score (0-10)
    let bmiScore;
    if (bmi < 16) bmiScore = 2;
    else if (bmi < 18.5) bmiScore = 5;
    else if (bmi < 25) bmiScore = 10;
    else if (bmi < 30) bmiScore = 7;
    else if (bmi < 35) bmiScore = 4;
    else bmiScore = 2;
    
    // Heart Rate Score (0-10)
    let hrScore;
    if (heartRate < 60) hrScore = 10;
    else if (heartRate < 70) hrScore = 9;
    else if (heartRate < 80) hrScore = 7;
    else if (heartRate < 90) hrScore = 5;
    else hrScore = 3;
    
    // Sleep Score (0-10)
    let sleepScore;
    if (sleep >= 7 && sleep <= 9) sleepScore = 10;
    else if (sleep >= 6 && sleep < 7) sleepScore = 7;
    else if (sleep >= 5 && sleep < 6) sleepScore = 5;
    else sleepScore = 3;
    
    // Exercise Score (0-10)
    let exerciseScore = Math.min(10, (exercise / 5) * 10);
    
    // Age adjustment (slight penalty for older age)
    let ageMultiplier = 1.0;
    if (age > 60) ageMultiplier = 0.95;
    else if (age > 70) ageMultiplier = 0.90;
    
    // Calculate weighted total score
    const totalScore = (
        bmiScore * 0.20 +
        hrScore * 0.15 +
        bloodPressure * 0.20 +
        sleepScore * 0.15 +
        exerciseScore * 0.15 +
        smoking * 0.15
    ) * ageMultiplier;
    
    // Ensure score is between 1 and 10
    const finalScore = Math.max(1, Math.min(10, Math.round(totalScore * 10) / 10));
    
    // Display result
    const resultDiv = document.getElementById('result');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const healthStatus = document.getElementById('healthStatus');
    const bmiInfo = document.getElementById('bmiInfo');
    const scaleMarker = document.getElementById('scaleMarker');
    
    scoreDisplay.textContent = finalScore.toFixed(1);
    
    // Position the marker on the scale (1-10 scale)
    const markerPosition = ((finalScore - 1) / 9) * 100;
    scaleMarker.style.left = `calc(${markerPosition}% - 2px)`;
    
    let status, statusClass, bmiCategory;
    if (finalScore >= 8.5) {
        status = "Excellent Health!";
        statusClass = "status-excellent";
    } else if (finalScore >= 7) {
        status = "Good Health";
        statusClass = "status-good";
    } else if (finalScore >= 5) {
        status = "Fair Health";
        statusClass = "status-fair";
    } else {
        status = "Needs Improvement";
        statusClass = "status-poor";
    }
    
    if (bmi < 18.5) bmiCategory = "Underweight";
    else if (bmi < 25) bmiCategory = "Normal";
    else if (bmi < 30) bmiCategory = "Overweight";
    else bmiCategory = "Obese";
    
    healthStatus.textContent = status;
    healthStatus.className = `health-status ${statusClass}`;
    bmiInfo.innerHTML = `BMI: <strong>${bmi.toFixed(1)}</strong> (${bmiCategory})`;
    
    // Show detailed calculations
    const calcDetails = document.getElementById('calcDetails');
    calcDetails.innerHTML = `
        <div class="calc-section">
            <div class="calc-header">🧮 BMI Calculation</div>
            <div class="calc-detail">Height: ${height} cm = ${heightM.toFixed(2)} m</div>
            <div class="calc-detail">Weight: ${weight} kg</div>
            <div class="calc-formula">BMI = Weight ÷ (Height)² = ${weight} ÷ (${heightM.toFixed(2)})² = ${bmi.toFixed(2)}</div>
            <div class="calc-detail">BMI Score: <span class="calc-result">${bmiScore}/10</span></div>
        </div>
        
        <div class="calc-section">
            <div class="calc-header">❤️ Heart Rate Score</div>
            <div class="calc-detail">Resting Heart Rate: ${heartRate} bpm</div>
            <div class="calc-detail">Score: <span class="calc-result">${hrScore}/10</span></div>
            <div class="calc-detail" style="font-size: 12px; color: #888;">Lower resting heart rate = Better cardiovascular fitness</div>
        </div>
        
        <div class="calc-section">
            <div class="calc-header">🩺 Blood Pressure Score</div>
            <div class="calc-detail">Score: <span class="calc-result">${bloodPressure}/10</span></div>
        </div>
        
        <div class="calc-section">
            <div class="calc-header">😴 Sleep Score</div>
            <div class="calc-detail">Sleep Duration: ${sleep} hours/night</div>
            <div class="calc-detail">Score: <span class="calc-result">${sleepScore}/10</span></div>
            <div class="calc-detail" style="font-size: 12px; color: #888;">Optimal: 7-9 hours</div>
        </div>
        
        <div class="calc-section">
            <div class="calc-header">🏃 Exercise Score</div>
            <div class="calc-detail">Exercise Days: ${exercise} days/week</div>
            <div class="calc-detail">Score: <span class="calc-result">${exerciseScore.toFixed(1)}/10</span></div>
            <div class="calc-detail" style="font-size: 12px; color: #888;">Target: 5+ days/week</div>
        </div>
        
        <div class="calc-section">
            <div class="calc-header">🚭 Smoking Status Score</div>
            <div class="calc-detail">Score: <span class="calc-result">${smoking}/10</span></div>
        </div>
        
        <div class="calc-section" style="background: #e8eaf6; border-left-color: #5e35b1;">
            <div class="calc-header">📈 Final Health Score Calculation</div>
            <div class="calc-formula">
                Score = (BMI×0.20 + Heart Rate×0.15 + Blood Pressure×0.20 + Sleep×0.15 + Exercise×0.15 + Smoking×0.15) × Age Factor
            </div>
            <div class="calc-formula">
                Score = (${bmiScore}×0.20 + ${hrScore}×0.15 + ${bloodPressure}×0.20 + ${sleepScore}×0.15 + ${exerciseScore.toFixed(1)}×0.15 + ${smoking}×0.15) × ${ageMultiplier}
            </div>
            <div class="calc-formula">
                Score = ${totalScore.toFixed(2)} ≈ <span class="calc-result">${finalScore.toFixed(1)}/10</span>
            </div>
            <div class="calc-detail" style="margin-top: 10px;">
                <strong>Weight Distribution:</strong><br>
                • BMI: 20% | Blood Pressure: 20%<br>
                • Heart Rate: 15% | Sleep: 15%<br>
                • Exercise: 15% | Smoking: 15%
            </div>
        </div>
    `;
    
    // Generate personalized feedback and tips
    const feedbackContent = document.getElementById('feedbackContent');
    let feedbackText = '';
    let tips = [];
    
    if (finalScore >= 8.5) {
        feedbackText = `<div class="feedback-content">🌟 <strong>Outstanding!</strong> Your health score is excellent. You're doing a fantastic job maintaining your wellness. Keep up these healthy habits and continue with regular check-ups to stay on track.</div>`;
        
        if (exercise < 5) tips.push({icon: '🏃', category: 'Exercise', text: 'Consider increasing to 5+ days per week for optimal cardiovascular health.'});
        if (sleep < 7 || sleep > 9) tips.push({icon: '😴', category: 'Sleep', text: 'Aim for 7-9 hours of sleep for peak recovery and mental clarity.'});
        if (bmi < 18.5 || bmi >= 25) tips.push({icon: '⚖️', category: 'Weight', text: 'Work towards a BMI in the normal range (18.5-24.9) through balanced nutrition.'});
        
        if (tips.length === 0) {
            tips.push({icon: '✨', category: 'Maintenance', text: 'Keep up your excellent routine with regular health screenings.'});
            tips.push({icon: '🧘', category: 'Mental Health', text: 'Don\'t forget mental wellness - practice stress management and mindfulness.'});
            tips.push({icon: '🥗', category: 'Nutrition', text: 'Maintain a diverse, colorful diet rich in whole foods.'});
        }
    } else if (finalScore >= 7) {
        feedbackText = `<div class="feedback-content">👍 <strong>Good work!</strong> Your health is in good shape, but there's room for improvement. Focus on the areas below to reach excellent health.</div>`;
        
        if (bmiScore < 8) tips.push({icon: '⚖️', category: 'BMI', text: `Your BMI is ${bmi.toFixed(1)}. ${bmi < 18.5 ? 'Increase calorie intake with nutrient-dense foods.' : bmi >= 30 ? 'Consider a structured weight loss plan with professional guidance.' : 'Work towards a healthy weight through balanced diet and exercise.'}`});
        if (hrScore < 8) tips.push({icon: '❤️', category: 'Heart Rate', text: 'Improve cardiovascular fitness with regular aerobic exercise like running, swimming, or cycling.'});
        if (bloodPressure < 8) tips.push({icon: '🩺', category: 'Blood Pressure', text: 'Reduce sodium intake, manage stress, and consult your doctor for monitoring.'});
        if (sleepScore < 8) tips.push({icon: '😴', category: 'Sleep', text: `At ${sleep} hours, adjust your sleep schedule. Aim for 7-9 hours with consistent bedtime/wake times.`});
        if (exerciseScore < 8) tips.push({icon: '🏃', category: 'Exercise', text: `Increase from ${exercise} to 5+ days per week. Start with 30-minute sessions of moderate activity.`});
        if (smoking < 10) tips.push({icon: '🚭', category: 'Smoking', text: 'Quitting smoking is one of the best things you can do for your health. Seek support programs or nicotine replacement therapy.'});
        
    } else if (finalScore >= 5) {
        feedbackText = `<div class="feedback-content">⚠️ <strong>Needs attention.</strong> Your health score indicates several areas that need improvement. Don't be discouraged - small consistent changes can make a big difference!</div>`;
        
        if (bmiScore < 7) tips.push({icon: '⚖️', category: 'BMI Priority', text: `BMI ${bmi.toFixed(1)} needs attention. ${bmi < 18.5 ? 'Consult a nutritionist to develop a healthy weight gain plan.' : 'Start with a modest calorie deficit (300-500 cal/day) and focus on whole foods.'}`});
        if (hrScore < 7) tips.push({icon: '❤️', category: 'Heart Health', text: 'Start with light cardio like brisk walking for 20-30 minutes, 3-4 times per week.'});
        if (bloodPressure < 7) tips.push({icon: '🩺', category: 'Blood Pressure', text: 'This is critical - consult your doctor immediately. Reduce salt, increase potassium-rich foods, and manage stress.'});
        if (sleepScore < 7) tips.push({icon: '😴', category: 'Sleep Hygiene', text: 'Create a bedtime routine: no screens 1 hour before bed, cool dark room, and consistent schedule.'});
        if (exerciseScore < 7) tips.push({icon: '🏃', category: 'Start Moving', text: 'Begin with just 15 minutes daily - walking, stretching, or light activities. Gradually increase duration and intensity.'});
        if (smoking < 7) tips.push({icon: '🚭', category: 'Smoking Cessation', text: 'Make quitting your #1 priority. Talk to your doctor about cessation programs and medications that can help.'});
        
        tips.push({icon: '👨‍⚕️', category: 'Professional Help', text: 'Consider scheduling a comprehensive health check-up and discuss your goals with a healthcare provider.'});
        
    } else {
        feedbackText = `<div class="feedback-content">🚨 <strong>Immediate action needed.</strong> Your health score is concerning and requires immediate attention. Please consult with healthcare professionals to develop a comprehensive improvement plan.</div>`;
        
        if (bmiScore <= 4) tips.push({icon: '⚖️', category: 'BMI Critical', text: `BMI ${bmi.toFixed(1)} requires medical attention. See a doctor and nutritionist for a supervised health plan.`});
        if (hrScore <= 4) tips.push({icon: '❤️', category: 'Heart Health', text: 'Elevated resting heart rate needs evaluation. Consult a cardiologist and start gentle, supervised exercise.'});
        if (bloodPressure <= 4) tips.push({icon: '🩺', category: 'Blood Pressure', text: '⚠️ HIGH PRIORITY: See your doctor immediately. This requires medical management and lifestyle changes.'});
        if (sleepScore <= 4) tips.push({icon: '😴', category: 'Sleep Deficit', text: 'Severe sleep deprivation affects all health areas. Discuss with your doctor - you may have a sleep disorder.'});
        if (exerciseScore <= 4) tips.push({icon: '🏃', category: 'Physical Activity', text: 'Start with 10 minutes of daily gentle movement. Even light activity is better than none.'});
        if (smoking <= 4) tips.push({icon: '🚭', category: 'Smoking', text: '⚠️ CRITICAL: Smoking is severely impacting your health. Seek immediate help from smoking cessation programs.'});
        
        tips.push({icon: '👨‍⚕️', category: 'Medical Consultation', text: 'Schedule an appointment with your doctor ASAP for a full health assessment and personalized treatment plan.'});
        tips.push({icon: '💪', category: 'Take Action', text: 'Don\'t feel overwhelmed. Focus on one change at a time. Every small step counts towards better health.'});
    }
    
    // Build tips HTML
    let tipsHTML = '<div class="tips-list">';
    tips.forEach(tip => {
        tipsHTML += `
            <div class="tip-item">
                <span class="tip-icon">${tip.icon}</span>
                <div class="tip-text">
                    <span class="tip-category">${tip.category}:</span>${tip.text}
                </div>
            </div>
        `;
    });
    tipsHTML += '</div>';
    
    feedbackContent.innerHTML = feedbackText + tipsHTML;
    
    // Store data for PDF generation
    currentHealthData = {
        age, weight, height, heartRate, bloodPressure, sleep, exercise, smoking,
        bmi, bmiScore, hrScore, sleepScore, exerciseScore, totalScore, finalScore,
        status, bmiCategory, heightM, ageMultiplier, feedbackText, tips
    };
    
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Show the second download button at the bottom
    document.getElementById('downloadBtn2').style.display = 'flex';
});

function downloadPDF() {
    if (!currentHealthData) return;
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const data = currentHealthData;
    let yPos = 20;
    const pageWidth = 210;
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    
    // Title
    doc.setFillColor(102, 126, 234);
    doc.rect(0, 0, pageWidth, 35, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('Health Score Report', pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, 28, { align: 'center' });
    
    yPos = 45;
    
    // Health Score Box
    doc.setFillColor(245, 247, 250);
    doc.roundedRect(margin, yPos, contentWidth, 35, 3, 3, 'F');
    doc.setTextColor(102, 126, 234);
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Your Health Score', pageWidth / 2, yPos + 10, { align: 'center' });
    doc.setFontSize(36);
    doc.text(`${data.finalScore.toFixed(1)}/10`, pageWidth / 2, yPos + 25, { align: 'center' });
    doc.setFontSize(12);
    doc.text(data.status, pageWidth / 2, yPos + 32, { align: 'center' });
    
    yPos += 45;
    
    // BMI Information
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('BMI Calculation', margin, yPos);
    yPos += 7;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Height: ${data.height} cm (${data.heightM.toFixed(2)} m)`, margin, yPos);
    yPos += 5;
    doc.text(`Weight: ${data.weight} kg`, margin, yPos);
    yPos += 5;
    doc.text(`BMI = ${data.weight} ÷ (${data.heightM.toFixed(2)})² = ${data.bmi.toFixed(2)} (${data.bmiCategory})`, margin, yPos);
    yPos += 5;
    doc.setFont(undefined, 'bold');
    doc.text(`BMI Score: ${data.bmiScore}/10`, margin, yPos);
    
    yPos += 12;
    
    // Component Scores
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Component Scores', margin, yPos);
    yPos += 7;
    
    doc.setFillColor(248, 249, 250);
    doc.roundedRect(margin, yPos, contentWidth, 40, 2, 2, 'F');
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const leftCol = margin + 5;
    const rightCol = pageWidth / 2 + 5;
    
    doc.text(`❤️ Heart Rate: ${data.hrScore}/10`, leftCol, yPos + 7);
    doc.text(`🩺 Blood Pressure: ${data.bloodPressure}/10`, rightCol, yPos + 7);
    doc.text(`😴 Sleep: ${data.sleepScore}/10`, leftCol, yPos + 14);
    doc.text(`🏃 Exercise: ${data.exerciseScore.toFixed(1)}/10`, rightCol, yPos + 14);
    doc.text(`🚭 Smoking Status: ${data.smoking}/10`, leftCol, yPos + 21);
    doc.text(`⚖️ BMI: ${data.bmiScore}/10`, rightCol, yPos + 21);
    
    yPos += 47;
    
    // Final Calculation
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Final Score Calculation', margin, yPos);
    yPos += 7;
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text(`Score = (BMI×0.20 + HR×0.15 + BP×0.20 + Sleep×0.15 + Exercise×0.15 + Smoking×0.15) × Age Factor`, margin, yPos);
    yPos += 5;
    doc.text(`Score = (${data.bmiScore}×0.20 + ${data.hrScore}×0.15 + ${data.bloodPressure}×0.20 + ${data.sleepScore}×0.15 + ${data.exerciseScore.toFixed(1)}×0.15 + ${data.smoking}×0.15) × ${data.ageMultiplier}`, margin, yPos);
    yPos += 5;
    doc.setFont(undefined, 'bold');
    doc.text(`Final Score = ${data.totalScore.toFixed(2)} ≈ ${data.finalScore.toFixed(1)}/10`, margin, yPos);
    
    yPos += 12;
    
    // New page for feedback if needed
    if (yPos > 240) {
        doc.addPage();
        yPos = 20;
    }
    
    // Feedback Section
    doc.setFillColor(102, 126, 234, 0.1);
    doc.roundedRect(margin, yPos, contentWidth, 15, 2, 2, 'F');
    doc.setTextColor(102, 126, 234);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Personalized Feedback', margin + 5, yPos + 10);
    
    yPos += 20;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    
    // Extract feedback text without HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data.feedbackText;
    const feedbackPlainText = tempDiv.textContent || tempDiv.innerText;
    const feedbackLines = doc.splitTextToSize(feedbackPlainText, contentWidth - margin);
    doc.text(feedbackLines, margin, yPos);
    yPos += feedbackLines.length * 5 + 10;
    
    // Tips
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Improvement Tips:', margin, yPos);
    yPos += 7;
    
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    
    data.tips.forEach((tip, index) => {
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
        
        const tipText = `${tip.icon} ${tip.category}: ${tip.text}`;
        const lines = doc.splitTextToSize(tipText, contentWidth - pageWidth/2);
        doc.text(lines, margin + 5, yPos);
        yPos += lines.length * 4 + 3;
    });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('This report is for informational purposes only. Consult healthcare professionals for medical advice.', pageWidth / 2, 285, { align: 'center' });
    
    // Save PDF
    doc.save(`Health_Report_${new Date().toISOString().split('T')[0]}.pdf`);
}
