$(document).ready(function() {

    var elValidation = El.Validation;
    var elForm = $("#commentForm");
    var elconfig = {
        rules: {
            first_name: {
                required: true,
                string: true
            },
            email: {
                validEmail: true,
                required: true
            },
            password: {
                required: true
            },
            number: {
                required: true,
                maxValue: true,
                positive: true,
                integer: true
            },
            mobileNumber: {
                required: true,
                indianMobNumber: true
            }
        },
        messages: {
            first_name: {
                required: "Ma3lsh bs da required",
                string: "accepts only Alphabetic letters"
            },
            email: {
                validEmail: "Special characters are not allowed",
                required: "Ma3lsh ba2a bs da bardo required"
            },
            password: {
                required: "Ma3lsh Password required"
            },
            number: {
                required: "Ma3lsh Password required",
                maxValue: "ma yenf3sh yezed 3n 5 walahi",
                positive: "Ma yenf3sh walahi yeb2a negative",
                integer: "Number must be integer"
            },
            mobileNumber: {
                required: "Ma3lsh bs da required",
                indianMobNumber: "Indian mobile number only accepted here"
            }
        },
        submitHandler: function() {
            alert("Bingo!");
        }

    };

    elValidation.init(elForm, elconfig);

});