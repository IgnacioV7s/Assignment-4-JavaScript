document.getElementById('fetchExercises').addEventListener('click', async () => {
    const bodyPart = document.getElementById('bodyPart').value;
    const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b67929007dmsh97439899eb81412p1c408ejsn987f24ad4b85',
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const exercises = await response.json();
        displayExercises(exercises);
    } catch (error) {
        console.error('Error fetching exercises:', error);
        document.getElementById('exerciseList').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

function displayExercises(exercises) {
    const exerciseList = document.getElementById('exerciseList');
    exerciseList.innerHTML = '';

    if (exercises.length === 0) {
        exerciseList.innerHTML = '<p>No exercises found.</p>';
        return;
    }

    exercises.forEach(exercise => {
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'exercise';
        exerciseDiv.innerHTML = `
            <h3>${exercise.name}</h3>
            <p><strong>Body Part:</strong> ${exercise.bodyPart}</p>
            <p><strong>Target:</strong> ${exercise.target}</p>
            <p><strong>Equipment:</strong> ${exercise.equipment}</p>
            <img src="${exercise.gifUrl}" alt="${exercise.name}">
            <p><strong>Instructions:</strong> ${exercise.instructions.join('<br>')}</p>
        `;
        exerciseList.appendChild(exerciseDiv);
    });
}