const uploadModal = document.getElementById('uploadModal');
const uploadForm = document.querySelector('#uploadModal form');
  
// Clear validation errors
function clearValidationErrors(form) {
    form.querySelectorAll('.validation-error').forEach(el => el.remove());
}

// Validate form
function validateCourseForm(form) {
    clearValidationErrors(form);

    let hasError = false;

    const titleInput = form.querySelector('input[name="title"]');
    const categorySelect = form.querySelector('select[name="category"]');
    const enrollmentsInput = form.querySelector('input[name="enrollments"]');
    const ratingInput = form.querySelector('input[name="rating"]');
    const reviewCountInput = form.querySelector('input[name="reviewCount"]');
    const courseFilesInput = form.querySelector('input[name="courseMaterials"]'); 

    const showError = (input, message) => {
    const error = document.createElement('div');
    error.className = 'text-danger validation-error mt-1';
    error.innerText = message;
    input.parentElement.appendChild(error);
    hasError = true;
    };

    //Validation requirement
    if (!titleInput.value.trim()) {
    showError(titleInput, 'Course title is required.');
    } else if (titleInput.value.trim().length < 3) {
    showError(titleInput, 'Course title must be at least 3 characters.');
    } else if (titleInput.value.trim().length > 100) {
    showError(titleInput, 'Course title cannot exceed 100 characters.');
    }

    if (!categorySelect.value) {
    showError(categorySelect, 'Please select a category.');
    }

    const enrollments = parseInt(enrollmentsInput.value);
    const rating = parseFloat(ratingInput.value);
    const reviewCount = parseInt(reviewCountInput.value);

    if (!enrollmentsInput.value.trim()) {
    showError(enrollmentsInput, 'Enrollments field is required.');
    } else if (isNaN(enrollments) || enrollments < 0 || enrollments > 99999) {
    showError(enrollmentsInput, 'Enrollments must be between 0 and 99,999.');
    }

    if (!ratingInput.value.trim()) {
    showError(ratingInput, 'Rating field is required.');
    } else if (isNaN(rating) || rating < 0 || rating > 5) {
    showError(ratingInput, 'Rating must be between 0 and 5.');
    }

    if (!reviewCountInput.value.trim()) {
    showError(reviewCountInput, 'Review Count field is required.');
    } else if (isNaN(reviewCount) || reviewCount < 0 || reviewCount > 99999) {
    showError(reviewCountInput, 'Review Count must be between 0 and 99,999.');
    }


    if (courseFilesInput) {
    if (!courseFilesInput.files || courseFilesInput.files.length === 0) {
        showError(courseFilesInput, 'Please upload at least one course file.');
    } else {
        const allowedTypes = ['image/jpeg', 'image/png']; 
        const maxFileSize = 10 * 1024 * 1024; 

        Array.from(courseFilesInput.files).forEach(file => {
        if (!allowedTypes.includes(file.type)) {
            showError(courseFilesInput, `File "${file.name}" must be JPG, PNG.`);
        }
        if (file.size > maxFileSize) {
            showError(courseFilesInput, `File "${file.name}" exceeds 10MB size limit.`);
        }
        });
    }
}

    return !hasError;
}

// Attach submit handler to any form
function attachValidationHandler(form) {
    form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateCourseForm(this)) {
        this.submit();
    }
    });
}

// Handle upload form 
if (uploadForm && uploadModal) {
    uploadModal.addEventListener('show.bs.modal', function () {
    clearValidationErrors(uploadForm);
    uploadForm.reset(); 
    });

    attachValidationHandler(uploadForm);
}

// Handle edit forms
document.querySelectorAll('form[action^="/edit-course/"]').forEach(editForm => {
const editModal = editForm.closest('.modal');

if (editModal) {
    editModal.addEventListener('show.bs.modal', function () {
    clearValidationErrors(editForm);
    editForm.reset(); 
    });

    attachValidationHandler(editForm);
}
});

// Handle sorting
document.querySelectorAll('.sort-option').forEach(option => {
    option.addEventListener('click', function (e) {
    e.preventDefault();

    const sortType = this.dataset.sort;
    const coursesContainer = document.getElementById('coursesContainer');
    const courseCards = Array.from(coursesContainer.querySelectorAll('.course-card-container'));

    courseCards.sort((a, b) => {
        if (sortType === 'newest') {
        return new Date(b.dataset.updated) - new Date(a.dataset.updated);
        } else if (sortType === 'oldest') {
        return new Date(a.dataset.updated) - new Date(b.dataset.updated);
        } else if (sortType === 'mostPopular') {
        return parseInt(b.dataset.enrollments) - parseInt(a.dataset.enrollments);
        } else if (sortType === 'highestRated') {
        return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
        }
    });

    // Reorder the cards
    courseCards.forEach(card => {
        coursesContainer.appendChild(card);
    });

    document.getElementById('currentSortText').textContent = this.textContent;
    });
});