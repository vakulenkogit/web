<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
$filename = 'data.csv';

if (!file_exists($filename)) {
    echo "<p>Файл <strong>$filename</strong> не знайдено!</p>";
    exit;
}

$file = fopen($filename, 'r');

if (!$file) {
    echo "<p>Не вдалося відкрити файл!</p>";
    exit;
}

echo "<h1>Таблиця даних з файлу</h1>";
echo "<table border='1' cellpadding='5' cellspacing='0'>";

$rowIndex = 0;

while (($row = fgetcsv($file, 0, ';')) !== false) {
    echo "<tr>";

    if ($rowIndex === 0) {
        foreach ($row as $cell) {
            echo "<th>" . htmlspecialchars($cell) . "</th>";
        }
    } else {
        foreach ($row as $cell) {
            echo "<td>" . htmlspecialchars($cell) . "</td>";
        }
    }

    echo "</tr>";
    $rowIndex++;
}

echo "</table>";

fclose($file);
?>
</body>
</html>
