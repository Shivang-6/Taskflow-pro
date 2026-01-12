<?php
// Enable CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// Get request URI and method
$request_uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$request_method = $_SERVER["REQUEST_METHOD"];

// Remove trailing slash
$request_uri = rtrim($request_uri, "/");

// Simple router
if ($request_method === "POST" && $request_uri === "/api/register") {
    // Handle registration
    $input = json_decode(file_get_contents("php://input"), true);
    
    $response = [
        "status" => "success",
        "message" => "Registration successful",
        "data" => [
            "user" => [
                "id" => 1,
                "email" => $input["email"] ?? "user@example.com",
                "full_name" => $input["full_name"] ?? "Demo User"
            ],
            "token" => "demo_jwt_token_" . bin2hex(random_bytes(16))
        ]
    ];
    
    echo json_encode($response);
    
} elseif ($request_method === "POST" && $request_uri === "/api/login") {
    // Handle login
    $input = json_decode(file_get_contents("php://input"), true);
    
    $response = [
        "status" => "success",
        "message" => "Login successful",
        "data" => [
            "user" => [
                "id" => 1,
                "email" => $input["email"] ?? "user@example.com",
                "full_name" => "Demo User"
            ],
            "token" => "demo_jwt_token_" . bin2hex(random_bytes(16))
        ]
    ];
    
    echo json_encode($response);
    
} elseif ($request_method === "GET" && $request_uri === "/api/tasks") {
    // Return demo tasks
    $tasks = [
        [
            "id" => 1,
            "title" => "Complete internship project",
            "description" => "Build TaskFlow Pro application with React and PHP",
            "status" => "in_progress",
            "priority" => "high",
            "category" => "work",
            "due_date" => "2024-01-20",
            "created_at" => "2024-01-13 10:00:00"
        ],
        [
            "id" => 2,
            "title" => "Learn React hooks",
            "description" => "Master useState, useEffect, and custom hooks",
            "status" => "completed",
            "priority" => "medium",
            "category" => "learning",
            "due_date" => "2024-01-15",
            "created_at" => "2024-01-12 14:30:00"
        ],
        [
            "id" => 3,
            "title" => "Database design",
            "description" => "Create MySQL schema with proper relationships",
            "status" => "todo",
            "priority" => "high",
            "category" => "work",
            "due_date" => "2024-01-18",
            "created_at" => "2024-01-13 09:15:00"
        ],
        [
            "id" => 4,
            "title" => "UI/UX improvements",
            "description" => "Implement dark mode and responsive design",
            "status" => "in_progress",
            "priority" => "medium",
            "category" => "design",
            "due_date" => "2024-01-16",
            "created_at" => "2024-01-13 11:30:00"
        ],
        [
            "id" => 5,
            "title" => "API documentation",
            "description" => "Write comprehensive API docs with examples",
            "status" => "todo",
            "priority" => "low",
            "category" => "documentation",
            "due_date" => "2024-01-25",
            "created_at" => "2024-01-13 12:45:00"
        ]
    ];
    
    $response = [
        "status" => "success",
        "data" => $tasks
    ];
    
    echo json_encode($response);
    
} else {
    // Endpoint not found
    http_response_code(404);
    echo json_encode([
        "status" => "error",
        "message" => "Endpoint not found. Available: GET /api/tasks, POST /api/register, POST /api/login"
    ]);
}
?>