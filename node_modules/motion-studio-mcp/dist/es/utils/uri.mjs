function uri(path) {
    return `motion://${path}`;
}
function exampleUri(platform, id) {
    return uri(`examples/${platform}/${id}`);
}
function docsUri(platform, id) {
    return uri(`docs/${platform}/${id}`);
}

export { docsUri, exampleUri, uri };
