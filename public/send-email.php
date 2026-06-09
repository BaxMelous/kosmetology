<?php
/**
 * Обработчик отправки заявок с сайта СитиМед Эстетика
 * TimeWeb shared hosting — использует mail() + SMTP fallback
 */
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log');

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Метод не поддерживается']);
    exit;
}

function writeLog($message) {
    $logFile = __DIR__ . '/email-debug.log';
    $timestamp = date('Y-m-d H:i:s');
    @file_put_contents($logFile, "[$timestamp] $message" . PHP_EOL, FILE_APPEND);
}

// ─── Обработка запроса ───

try {
    writeLog("=== Start ===");

    $input = file_get_contents('php://input');
    writeLog("Input: " . $input);

    $data = json_decode($input, true);
    if (!$data) {
        throw new Exception('Нет данных или неверный JSON');
    }

    $to = 'info@citymed12.ru';
    $fromEmail = 'noreply@mccitymed.ru';
    $fromName = 'СитиМед Эстетика';

    $name = htmlspecialchars(trim($data['name'] ?? ''), ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars(trim($data['phone'] ?? ''), ENT_QUOTES, 'UTF-8');
    $message = nl2br(htmlspecialchars(trim($data['message'] ?? ''), ENT_QUOTES, 'UTF-8'));
    $page = htmlspecialchars(trim($data['page'] ?? 'Не указана'), ENT_QUOTES, 'UTF-8');
    $userSubject = htmlspecialchars(trim($data['subject'] ?? ''), ENT_QUOTES, 'UTF-8');

    if (empty($phone) && empty($name)) {
        throw new Exception('Не заполнены обязательные поля');
    }

    $subject = 'Заявка с сайта СитиМед Эстетика';
    if (!empty($userSubject)) {
        $subject .= ' — ' . $userSubject;
    } elseif (!empty($name)) {
        $subject .= ' — ' . $name;
    }

    $dateTime = date('d.m.Y H:i');

    $subjectRow = '';
    if (!empty($userSubject)) {
        $subjectRow = '
            <tr>
                <td style="padding:8px 12px;background:#f8f9fa;font-weight:bold;width:120px">Услуга / врач</td>
                <td style="padding:8px 12px;color:#F97316;font-weight:500">' . $userSubject . '</td>
            </tr>';
    }

    $messageBody = '
    <html>
    <body style="font-family:Arial,sans-serif;color:#1a1a2e;max-width:600px">
        <h2 style="color:#F97316;margin-bottom:20px">Новая заявка с сайта</h2>
        <table style="width:100%;border-collapse:collapse">'
            . $subjectRow
            . '<tr><td style="padding:8px 12px;background:#f8f9fa;font-weight:bold;width:120px">Имя</td><td style="padding:8px 12px">' . $name . '</td></tr>'
            . '<tr><td style="padding:8px 12px;background:#f8f9fa;font-weight:bold">Телефон</td><td style="padding:8px 12px">' . $phone . '</td></tr>'
            . '<tr><td style="padding:8px 12px;background:#f8f9fa;font-weight:bold">Сообщение</td><td style="padding:8px 12px">' . $message . '</td></tr>'
            . '<tr><td style="padding:8px 12px;background:#f8f9fa;font-weight:bold">Страница</td><td style="padding:8px 12px">' . $page . '</td></tr>'
            . '<tr><td style="padding:8px 12px;background:#f8f9fa;font-weight:bold">Дата / время</td><td style="padding:8px 12px">' . $dateTime . '</td></tr>
        </table>
        <p style="margin-top:20px;font-size:12px;color:#94a3b8">Письмо отправлено автоматически с сайта СитиМед Эстетика</p>
    </body>
    </html>';

    // ── Способ 1: mail() — самый надёжный на TimeWeb ──
    writeLog("Trying mail()...");

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$fromEmail}>\r\n";
    $headers .= "Reply-To: {$to}\r\n";

    $mailSent = @mail($to, $subject, $messageBody, $headers, "-f{$fromEmail}");

    if ($mailSent) {
        writeLog("mail(): OK");
        echo json_encode(['status' => 'success', 'message' => 'Заявка отправлена']);
        exit;
    }

    writeLog("mail() failed");

    // ── Способ 2: SMTP timeweb.ru:25 (без авторизации) ──
    writeLog("Trying SMTP...");

    $smtpHost = 'smtp.timeweb.ru';
    $smtpPort = 25;
    $errno = 0;
    $errstr = '';

    $socket = @fsockopen($smtpHost, $smtpPort, $errno, $errstr, 10);

    if ($socket) {
        fgets($socket, 512);
        fputs($socket, "EHLO localhost\r\n");
        while ($line = fgets($socket, 512)) { if (substr($line, 3, 1) === ' ') break; }

        fputs($socket, "MAIL FROM:<{$fromEmail}>\r\n"); fgets($socket, 512);
        fputs($socket, "RCPT TO:<{$to}>\r\n"); fgets($socket, 512);
        fputs($socket, "DATA\r\n"); fgets($socket, 512);

        $raw = "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$fromEmail}>\r\n";
        $raw .= "To: {$to}\r\n";
        $raw .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
        $raw .= "MIME-Version: 1.0\r\n";
        $raw .= "Content-Type: text/html; charset=UTF-8\r\n";
        $raw .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $raw .= chunk_split(base64_encode($messageBody));
        $raw .= "\r\n.\r\n";

        fputs($socket, $raw);
        $response = fgets($socket, 512);
        fputs($socket, "QUIT\r\n");
        fclose($socket);

        if (substr($response, 0, 3) === '250') {
            writeLog("SMTP: OK");
            echo json_encode(['status' => 'success', 'message' => 'Заявка отправлена']);
            exit;
        }
        writeLog("SMTP rejected: " . trim($response));
    } else {
        writeLog("SMTP connect failed: $errstr ($errno)");
    }

    // Оба способа не сработали
    throw new Exception('Не удалось отправить письмо. Проверьте email-debug.log');

} catch (Exception $e) {
    writeLog("ERROR: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
