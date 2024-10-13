<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $service = $_POST['service'] ?? '';
    $title = $_POST['title'] ?? '';
    $firstName = $_POST['firstName'] ?? '';
    $lastName = $_POST['lastName'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $dateOfBirth = $_POST['dateOfBirth'] ?? '';
    $passport = $_FILES['passport'] ?? null;
    $location = $_POST['location'] ?? '';
    $preferredDate = $_POST['preferredDate'] ?? '';
    $testType = $_POST['testType'] ?? '';
    $message = $_POST['message'] ?? '';

    // Validate form data (add more validation as needed)
    if (empty($service) || empty($email) || empty($firstName) || empty($lastName)) {
        echo json_encode(['status' => 'error', 'message' => 'Please fill all required fields.']);
        exit;
    }

    // Handle file upload
    $uploadDir = 'uploads/';
    $uploadFile = $uploadDir . basename($passport['name']);
    if ($passport && move_uploaded_file($passport['tmp_name'], $uploadFile)) {
        $passportPath = $uploadFile;
    } else {
        $passportPath = '';
    }

    // Here you would typically save the data to a database
    // For this example, we'll just create a formatted message
    $appointmentDetails = "
    Service: $service
    Title: $title
    Name: $firstName $lastName
    Email: $email
    Phone: $phone
    Date of Birth: $dateOfBirth
    Location: $location
    Preferred Date: $preferredDate
    Test Type: $testType
    Message: $message
    Passport: " . ($passportPath ? "Uploaded" : "Not uploaded");

    // Send email (you need to configure your server's email settings)
    $to = $email;
    $subject = "Appointment Confirmation";
    $headers = "From: support@payterse.com\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $emailBody = "Thank you for booking an appointment with Payterse.\n\n";
    $emailBody .= "Your appointment details:\n$appointmentDetails\n\n";
    $emailBody .= "We will contact you shortly to confirm your appointment.";

    if (mail($to, $subject, $emailBody, $headers)) {
        echo json_encode(['status' => 'success', 'message' => 'Your appointment has been booked successfully. Please check your email for confirmation.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'There was an error processing your request. Please try again later.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
