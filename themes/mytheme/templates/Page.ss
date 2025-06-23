<!doctype html>
<html lang="$ContentLocale" class="scroll-smooth">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<%--    <% require themedJavascript('dist/javascript/app.js') %>--%>
<%--    <% require themedCSS("dist/css/css") %>--%>
    $ViteClient.RAW
    <link rel="stylesheet" href="$Vite("src/css/app.css")">
    <script type="module" src="$Vite("src/javascript/index.js")"></script>

    <title>$Title</title>
    $MetaTags(false)
    <% include Fonts %>
    <% include Favicons %>
</head>
<body class="bg-gray-300 text-gray-700 font-sans flex flex-col min-h-screen">

        <% include Header %>

        $Layout


        <% include Footer %>
</body>
</html>
