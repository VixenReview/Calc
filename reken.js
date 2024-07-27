function calculateCalories() {
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const activity = document.getElementById('activity').value;

    if (!age || !height || !weight) {
        document.getElementById('result').innerHTML = 'Vul alle velden in.';
        return;
    }

    // Katch-McArdle Formula (requires body fat percentage, using 21% for men and 28% for women as a placeholder)
    const bodyFatPercentage = gender === 'male' ? 21 : 28;
    const leanBodyMass = weight * (1 - (bodyFatPercentage / 100));
    const katchMcArdle = 370 + (21.6 * leanBodyMass);

    // Revised Harris-Benedict Equation
    const harrisBenedict = gender === 'male'
        ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
        : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);

    // Mifflin-St Jeor Equation
    const mifflinStJeor = gender === 'male'
        ? (10 * weight) + (6.25 * height) - (5 * age) + 5
        : (10 * weight) + (6.25 * height) - (5 * age) - 161;

    // Average BMR
    const bmr = (katchMcArdle + harrisBenedict + mifflinStJeor) / 3;
    
    // Daily Caloric Needs
    const dailyCalories = bmr * activity;
    
    // To lose 0.5 kg per week, subtract 500 calories per day
    const caloriesToLoseWeight = dailyCalories - 500;

    document.getElementById('result').innerHTML = `Je dagelijkse caloriebehoefte om 0.5 kg per week af te vallen is ongeveer ${caloriesToLoseWeight.toFixed(2)} calorieën.`;
}

// Modal script
const modal = document.getElementById("infoModal");
const btn = document.getElementById("infoButton");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
