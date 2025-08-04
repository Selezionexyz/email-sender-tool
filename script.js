// Configuration EmailJS
let emailjsConfig = {
    serviceId: '',
    templateId: '',
    publicKey: ''
};

// Liste des emails
const emailList = [
    'sasakura@sunbrand.co.jp', 'kogure@sunbrand.co.jp',
    't-isaka@portodimoda.co.jp', 'y-kinoshita@portodimoda.co.jp',
    'tina@shangpin.com', 'lisa.dong@shangpin.com', 'bd4@shangpin.com', 'liming@shangpin.com',
    'kim_hyemin@eland.co.kr', 'bhkang@eland.co.kr', 'LEE_GIJUNG@eland.co.kr', 'kim_hosu@eland.co.kr',
    'bizplan8@hotmail.com',
    'yoshiko_yin@milanyi.cn', 'yinml@milanyi.cn',
    'lorenzozl@outlook.com',
    'Ellen.Lafaut@hautefashion.eu', 'Eveline.tant@hautefashion.eu', 'maurizio.girini@hautefashion.eu', 'Kitty.pang@hautefashion.eu',
    'topoptik@hotmail.com',
    'midori@ottoemezzo.jp',
    'hkliuyi@corp.netease.com', 'hzchengmingzhu@corp.netease.com', 'hzjianglixian@corp.netease.com', 'hzxieyi@corp.netease.com', 'hzzengyiyun@corp.netease.com',
    'stella.hong@hotmail.it',
    'jlrvogue88@gmail.com',
    'omihee910407@okmall.com',
    'jenny@mukita.com', 'ritesh@mukita.com', 'antonia@mukita.com',
    'karen.chia@reebonz.com', 'daniel.lim@reebonz.com', 'charlene.lim@reebonz.com',
    'y.konishi@gruppotanaka.jp',
    'betsy.chen@vipshop.co', 'aimee.wei@vipshop.co',
    'michelle_park@lotteshopping.com', 'q_do@lotteshopping.com', 'jhkim01@lotteshopping.com', 'kminjikk@lotteshopping.com', 'sjjung@lotteshopping.com', 'peteryeo@lotteshopping.com',
    'peng@goldcoast-ie.com',
    'jena910407@naver.com', 'ryuer1@naver.com',
    'sitoh@mac.com',
    'info@albawestbest.com',
    'clubfashionbuyer@gmail.com',
    'filippo.chen@qq.com',
    'kubob@mtd.biglobe.ne.jp',
    'charlee@keal-design.com',
    'cenkoymakk@gmail.com',
    'chiara_jie@hotmail.com',
    'philip@lorenzbach.com',
    'alice@giovanni-china.com',
    'briancc67@hotmail.com',
    'andrewchee01@gmail.com',
    'aayumi.zhu@mei.com',
    'aarounmps@gmail.com',
    'golddays@netvigator.com',
    'civatti@redigroup.it',
    'novocosmos@outlook.com',
    'fanny.f@wintop-asiapacific.com',
    'apkchoi@hanmail.net',
    'cho@swikoah.com',
    'queeniewang@coscia.com.cn',
    'valentina.besttrip@gmail.com',
    'Oscar.li@kuajing.com',
    'oscar@perfecttrading123.com',
    'sakshi@inceincorporation.com', 'chandra@inceincorporation.com', 'nand@inceincorporation.com',
    'amit@grupomarina.es',
    'boaz@cameogrp.com',
    'mjtradingmike@gmail.com',
    'progetto@progettointernazionale.it',
    'f.gottardi@mctradingitaly.com', 'g.chen.di@mctradingitaly.com',
    'info@kean.global', 'herbie@iconapparelgroup.com', 'joe@iconapparelgroup.com', 'meyer@iconapparelgroup.com', 'abie@iconapparelgroup.com', 'michael.a@iconapparelgroup.com', 'angela@iconapparelgroup.com'
];

// État de l'application
let sendingInProgress = false;
let sentEmails = [];
let failedEmails = [];

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Charger la configuration depuis localStorage
    loadConfig();
    // Générer un pixel de tracking gratuit
function generateTrackingPixel(email) {
    const encodedEmail = encodeURIComponent(email);
    // Option Statcounter (créez d'abord un compte gratuit)
    return `<img src="https://c.statcounter.com/12345678/0/${encodedEmail}/1/" alt="" style="border:none;margin:0;padding:0;width:1px;height:1px;">`;
}
    // Afficher la liste des destinataires
    displayRecipientList();
    
    // Initialiser EmailJS si config disponible
    if (emailjsConfig.publicKey) {
        emailjs.init(emailjsConfig.publicKey);
    }
});

// Extraire le prénom depuis l'email
function extractFirstName(email) {
    const namePart = email.split('@')[0];
    let firstName = namePart.split('.')[0] || namePart.split('_')[0] || namePart.split('-')[0];
    
    // Enlever les chiffres à la fin
    firstName = firstName.replace(/\d+$/, '');
    
    // Capitaliser la première lettre
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
}

// Afficher la liste des destinataires
function displayRecipientList() {
    const listElement = document.getElementById('recipientList');
    const countElement = document.getElementById('emailCount');
    
    listElement.innerHTML = emailList.map(email => 
        `${extractFirstName(email)} - ${email}`
    ).join('\n');
    
    countElement.textContent = emailList.length;
}

// Sauvegarder la configuration
function saveConfig() {
    emailjsConfig.serviceId = document.getElementById('serviceId').value;
    emailjsConfig.templateId = document.getElementById('templateId').value;
    emailjsConfig.publicKey = document.getElementById('publicKey').value;
    
    localStorage.setItem('emailjsConfig', JSON.stringify(emailjsConfig));
    
    // Initialiser EmailJS
    if (emailjsConfig.publicKey) {
        emailjs.init(emailjsConfig.publicKey);
    }
    
    showStatus('Configuration sauvegardée !', 'info');
}

// Charger la configuration
function loadConfig() {
    const saved = localStorage.getItem('emailjsConfig');
    if (saved) {
        emailjsConfig = JSON.parse(saved);
        document.getElementById('serviceId').value = emailjsConfig.serviceId || '';
        document.getElementById('templateId').value = emailjsConfig.templateId || '';
        document.getElementById('publicKey').value = emailjsConfig.publicKey || '';
    }
}

// Afficher un message de statut
function showStatus(message, type = 'info') {
    const statusElement = document.getElementById('status');
    statusElement.textContent = message;
    statusElement.className = type;
    statusElement.style.display = 'block';
}

// Mettre à jour la barre de progression
function updateProgress(current, total) {
    const progressContainer = document.querySelector('.progress-container');
    const progressFill = document.querySelector('.progress-fill');
    
    progressContainer.style.display = 'block';
    const percentage = Math.round((current / total) * 100);
    progressFill.style.width = percentage + '%';
    progressFill.textContent = `${current}/${total}`;
}

// Afficher les résultats
function displayResults() {
    const resultsSection = document.querySelector('.results');
    const resultsList = document.getElementById('resultsList');
    
    resultsSection.style.display = 'block';
    
    let html = '<h3>Résultats de l\'envoi :</h3>';
    html += `<p>✅ Réussis : ${sentEmails.length}</p>`;
    html += `<p>❌ Échoués : ${failedEmails.length}</p>`;
    
    if (failedEmails.length > 0) {
        html += '<h4>Emails non envoyés :</h4>';
        html += '<ul>';
        failedEmails.forEach(email => {
            html += `<li>${email}</li>`;
        });
        html += '</ul>';
    }
    
    resultsList.innerHTML = html;
}

// Envoyer un email
async function sendEmail(email, templateContent, subject) {
    const firstName = extractFirstName(email);
    const message = templateContent.replace(/{{prenom}}/gi, firstName);
    
    // NOUVEAU CODE
const trackingPixel = generateTrackingPixel(email);
const messageWithTracking = message + trackingPixel;
    
    const templateParams = {
        to_email: email,
        to_name: firstName,
        from_name: document.getElementById('senderName').value,
        from_email: document.getElementById('senderEmail').value,
        subject: subject,
        message: messageWithTracking,
        reply_to: document.getElementById('senderEmail').value
    };
    
    try {
        await emailjs.send(
            emailjsConfig.serviceId,
            emailjsConfig.templateId,
            templateParams
        );
        return { success: true, email };
    } catch (error) {
        console.error('Erreur envoi:', error);
        return { success: false, email, error: error.text || error.message };
    }
}

// Envoyer tous les emails
async function sendAllEmails() {
    if (sendingInProgress) {
        showStatus('Envoi déjà en cours...', 'warning');
        return;
    }
    
    // Validation
    if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
        showStatus('Veuillez configurer EmailJS d\'abord !', 'error');
        return;
    }
    
    const templateContent = document.getElementById('emailTemplate').value;
    const subject = document.getElementById('emailSubject').value;
    
    if (!templateContent || !subject) {
        showStatus('Veuillez remplir le sujet et le contenu du message !', 'error');
        return;
    }
    
    // Confirmation
    if (!confirm(`Êtes-vous sûr de vouloir envoyer ${emailList.length} emails ?`)) {
        return;
    }
    
    // Réinitialiser
    sendingInProgress = true;
    sentEmails = [];
    failedEmails = [];
    document.getElementById('sendButton').disabled = true;
    
    showStatus('Envoi en cours...', 'info');
    
    // Envoyer les emails avec un délai pour éviter les limites
    for (let i = 0; i < emailList.length; i++) {
        const email = emailList[i];
        updateProgress(i + 1, emailList.length);
        
        const result = await sendEmail(email, templateContent, subject);
        
        if (result.success) {
            sentEmails.push(email);
            showStatus(`✅ Envoyé à ${extractFirstName(email)} (${i + 1}/${emailList.length})`, 'info');
        } else {
            failedEmails.push(email);
            showStatus(`❌ Échec pour ${email}: ${result.error}`, 'error');
        }
        
        // Attendre 2 secondes entre chaque envoi pour éviter les limites
        if (i < emailList.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    
    // Fin de l'envoi
    sendingInProgress = false;
    document.getElementById('sendButton').disabled = false;
    
    if (failedEmails.length === 0) {
        showStatus(`✅ Tous les emails ont été envoyés avec succès !`, 'info');
    } else {
        showStatus(`Envoi terminé. ${sentEmails.length} réussis, ${failedEmails.length} échoués.`, 'warning');
    }
    
    displayResults();
}

// Test d'envoi
async function testEmail() {
    const testEmail = prompt('Entrez votre email pour le test :');
    if (!testEmail) return;
    
    const templateContent = document.getElementById('emailTemplate').value;
    const subject = document.getElementById('emailSubject').value;
    
    if (!templateContent || !subject) {
        showStatus('Veuillez remplir le sujet et le contenu du message !', 'error');
        return;
    }
    
    showStatus('Envoi du test...', 'info');
    
    const result = await sendEmail(testEmail, templateContent, subject);
    
    if (result.success) {
        showStatus(`✅ Email de test envoyé à ${testEmail}`, 'info');
    } else {
        showStatus(`❌ Échec de l'envoi : ${result.error}`, 'error');
    }
}
