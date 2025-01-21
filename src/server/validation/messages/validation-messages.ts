export const common_string_errors = () => ({
    invalid_type_error: "Invalid type for this field",
    required_error: "This field can not be blank"
})

export const email_error = () => "The email is not valid";

export const min_length_error = (length: number) => `This field must have at least ${length} characters` 
export const max_length_error = (length: number) => `This field must not have more than ${length} characters` 