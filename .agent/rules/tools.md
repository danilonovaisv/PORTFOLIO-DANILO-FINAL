---
trigger: always_on
---

# Tools##functions

namespace functions {
// Start a browser subagent to perform actions in the browser with the given task description. The subagent has access to tools for both interacting with web page content (clicking, typing, navigating, etc) and controlling the browser window itself (resizing, etc). Please make sure to define a clear condition to return on. After the subagent returns, you should read the DOM or capture a screenshot to see what it did. Note: All browser interactions are automatically recorded and saved as WebP videos to the artifacts directory. This is the ONLY way you can record a browser session video/animation. IMPORTANT: if the subagent returns that the open*browser_url tool failed, there is a browser issue that is out of your control. You MUST ask the user how to proceed and use the suggested_responses tool.
type browser_subagent = (*: {
// Name of the browser recording that is created with the actions of the subagent. Should be all lowercase with underscores, describing what the recording contains. Maximum 3 words. Example: 'login*flow_demo'
RecordingName: string,
// A clear, actionable task description for the browser subagent. The subagent is an agent similar to you, with a different set of tools, limited to tools to understand the state of and control the browser. The task you define is the prompt sent to this subagent. Avoid vague instructions, be specific about what to do and when to stop.
Task: string,
// Name of the task that the browser subagent is performing. This is the identifier that groups the subagent steps together, but should still be a human readable name. This should read like a title, should be properly capitalized and human readable, example: 'Navigating to Example Page'. Replace URLs or non-human-readable expressions like CSS selectors or long text with human-readable terms like 'URL' or 'Page' or 'Submit Button'. Be very sure this task name represents a reasonable chunk of work. It should almost never be the entire user request. This should be the very first argument.
TaskName: string,
// If true, wait for all previous tool calls from this turn to complete before executing (sequential). If false or omitted, execute this tool immediately (parallel with other tools).
waitForPreviousTools?: boolean,
}) => any;
// Find snippets of code from the codebase most relevant to the search query. This performs best when the search query is more precise and relating to the function or purpose of code. Results will be poor if asking a very broad question, such as asking about the general 'framework' or 'implementation' of a large component or system. This tool is useful to find code snippets fuzzily / semantically related to the search query but shouldn't be relied on for high recall queries (e.g. finding all occurrences of some variable or some pattern). Will only show the full code contents of the top items, and they may also be truncated. For other items it will only show the docstring and signature. Use view_code_item with the same path and node name to view the full code contents for any item.
type codebase_search = (*: {
// Search query
Query: string,
// List of absolute paths to directories to search over
TargetDirectories: string[],
// If true, wait for all previous tool calls from this turn to complete before executing (sequential). If false or omitted, execute this tool immediately (parallel with other tools).
waitForPreviousTools?: boolean,
}) => any;
// Get the status of a previously executed terminal command by its ID. Returns the current status (running, done), output lines as specified by output priority, and any error if present. Do not try to check the status of any IDs other than Background command IDs.
type command*status = (*: {
// ID of the command to get status for
CommandId: string,
// Number of characters to view. Make this as small as possible to avoid excessive memory usage.
OutputCharacterCount?: number,
// Number of seconds to wait for command completion before getting the status. If the command completes before this duration, this tool call will return early. Set to 0 to get the status of the command immediately. If you are only interested in waiting for command completion, set to 60.
WaitDurationSeconds: number,
// If true, wait for all previous tool calls from this turn to complete before executing (sequential). If false or omitted, execute this tool immediately (parallel with other tools).
waitForPreviousTools?: boolean,
}) => any;
// Search for files and subdirectories within a specified directory using fd.
// Results will include the type, size, modification time, and relative path.
// To avoid overwhelming output, the results are capped at 50 matches.
type find*by_name = (*: {
// Optional, exclude files/directories that match the given glob patterns
Excludes?: string[],
// Optional, file extensions to include (without leading .), matching paths must match at least one of the included extensions
Extensions?: string[],
// Optional, whether the full absolute path must match the glob pattern, default: only filename needs to match.
FullPath?: boolean,
// Optional, maximum depth to search
MaxDepth?: number,
// Optional, Pattern to search for, supports glob format
Pattern: string,
// The directory to search within
SearchDirectory: string,
// Optional, type filter, enum=file,directory,any
Type?: string,
// If true, wait for all previous tool calls from this turn to complete before executing (sequential). If false or omitted, execute this tool immediately (parallel with other tools).
waitForPreviousTools?: boolean,
}) => any;
// Generate an image or edit existing images based on a text prompt. The resulting image will be saved as an artifact for use. You can use this tool to generate user interfaces and iterate on a design with the USER for an application or website that you are building. When creating UI designs, generate only the interface itself without surrounding device frames (laptops, phones, tablets, etc.) unless the user explicitly requests them. You can also use this tool to generate assets for use in an application or website.
type generate*image = (*: {
// Name of the generated image to save. Should be all lowercase with underscores, describing what the image contains. Maximum 3 words. Example: 'login*page_mockup'
ImageName: string,
// Optional absolute paths to the images to use in generation. You can pass in images here if you would like to edit or combine images. You can pass in artifact images and any images in the file system. Note: you cannot pass in more than three images.
ImagePaths?: string[],
// The text prompt to generate an image for.
Prompt: string,
// If true, wait for all previous tool calls from this turn to complete before executing (sequential). If false or omitted, execute this tool immediately (parallel with other tools).
waitForPreviousTools?: boolean,
}) => any;
// Use ripgrep to find exact pattern matches within files or directories.
type grep_search = (*: {
// If true, performs a case-insensitive search.
CaseInsensitive?: boolean,
// Glob patterns to filter files found within the 'SearchPath', if 'SearchPath' is a directory. For example, '_.go' to only include Go files, or '!\*\*/vendor/_' to exclude vendor directories.
Includes?: string[],
// If true, treats Query as a regular expression pattern with special characters like \*, +, (, etc. having regex meaning. If false, treats Query as a literal string where all characters are matched exactly. Use false for normal text searches and true only when you specifically need regex functionality.
IsRegex?: boolean,
// If true, returns each line that matches the query, including line numbers and snippets of matching lines (equivalent to 'git grep -nI'). If false, only returns the names of files containing the query (equivalent to 'git grep -l').
MatchPerLine?: boolean,
// The search term or pattern to look for within files.
Query: string,
// The path to search. This can be a directory or a file. This is a required parameter.
SearchPath: string,
// If true, wait for all previous tool calls from this turn to complete before executing (sequential). If false or omitted, execute this tool immediately (parallel with other tools).
waitForPreviousTools?: boolean,
}) => any;
// List the contents of a directory, i.e. all files and subdirectories that are children of the directory.
type list*dir = (*: {
// Path to list contents of, should be absolute path to a directory
DirectoryPath: string,
// If true, wait for all previous tool calls from this turn to complete before executing (sequential). If false or omitted, execute this tool immediately (parallel with other tools).
waitForPreviousTools?: boolean,
}) => any;
// Lists the available resources from an MCP server.
type list*resources = (*: {
// Name of the server to list available resources from.
ServerName?: string,
// If true, wait for all previous tool calls from this turn to complete before executing (sequential). If false or omitted, execute this tool immediately (parallel with other tools).
waitForPreviousTools?: boolean,
}) => any;
// Retrieves a specified resource's contents.
type read*resource = (*: {
// Name of the server to read the resource from.
ServerName?: string,
// Unique identifier for the resource.
Uri?: string,
// If true, wait for all previous tool calls from this turn to complete before executing (sequential). If false or omitted, execute this tool immediately (parallel with other tools).
waitForPreviousTools?: boolean,
}) => any;
// Use this tool to edit an existing file. Follow these rules:
type multi*replace_file_content = (*: {
// Metadata updates if updating an artifact file, leave blank if not updating an artifact. Should be updated if the content is changing meaningfully.
ArtifactMetadata?: {
ArtifactType: "implementation*plan" | "walkthrough" | "task" | "other",
Summary: string},
// Markdown language for the code block, e.g 'python' or 'javascript'
CodeMarkdownLanguage: string,
// A 1-10 rating of how important it is for the user to review this change.
Complexity: number,
// Brief, user-facing explanation of what this change did.
Description: string,
// A description of the changes that you are making to the file.
Instruction: string,
// A list of chunks to replace.
ReplacementChunks: any[],
// The target file to modify. Always specify the target file as the very first argument.
TargetFile: string,
// If applicable, IDs of lint errors this edit aims to fix.
TargetLintErrorIds?: string[],
// If true, wait for all previous tool calls from this turn to complete before executing (sequential). If false or omitted, execute this tool immediately (parallel with other tools).
waitForPreviousTools?: boolean,
}) => any;
// Use this tool to edit an existing file. Follow these rules:
type replace_file_content = (*: {
// If true, multiple occurrences of 'targetContent' will be replaced.
AllowMultiple: boolean,
// Markdown language for the code block, e.g 'python' or 'javascript'
CodeMarkdownLanguage: string,
// A 1-10 rating of how important it is for the user to review this change.
Complexity: number,
// Brief, user-facing explanation of what this change did.
Description: string,
// The ending line number of the chunk (1-indexed).
EndLine: number,
// A description of the changes that you are making to the file.
Instruction: string,
// The content to replace the target content with.
ReplacementContent: string,
// The starting line number of the chunk (1-indexed).
StartLine: number,
// The exact string to be replaced.
TargetContent: string,
// The target file to modify. Always specify the target file as the very first argument.
TargetFile: string,
// If applicable, IDs of lint errors this edit aims to fix.
TargetLintErrorIds?: string[],
// If true, wait for all previous tool calls from this turn to complete before executing (sequential). If false or omitted, execute this tool immediately (parallel with other tools).
waitForPreviousTools?: boolean,
}) => any;
// PROPOSE a comma
