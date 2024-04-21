import { join } from "https://deno.land/std/path/mod.ts";
import { contentType } from "https://deno.land/std@0.153.0/media_types/mod.ts";
import { fileExtension } from "https://deno.land/x/file_extension/mod.ts";

const port = 8080;
const basePath = import.meta.dirname!;

function resolvePath(urlPath: string): string {
    if (urlPath.startsWith('/npm/')) {
        urlPath = join ('..', urlPath);
    }

    if (urlPath.endsWith('/')) {
        urlPath = join (urlPath, 'index.html');
    }

    const localPath = join(basePath, urlPath);

    return localPath
}

const handler = async (request: Request): Promise<Response> => {
    const urlPath = new URL(request.url).pathname;
    let response = new Response;
    try {
        const filePath = resolvePath(urlPath);
        const fileInfo = await Deno.stat(filePath);
        console.log(`${urlPath} --> ${filePath}`)

        if (fileInfo.isFile) {
            const body = await Deno.readFile(filePath);
            response = new Response(body, {
                status: 200,
                headers: {
                    'content-length': fileInfo.size.toString(),
                    "content-type": contentType(fileExtension(filePath))!,
                }
            });
        }
        // else if (fileInfo.isDirectory) {

        // } else if (fileInfo.isSymlink) {

        // }

    } catch (error) {
        console.log(error);
        response = new Response(error, { status: 500 });
    }

    return response;
};

console.log(`HTTP server running. Access it at: http://localhost:${port}/`);
Deno.serve({ port }, handler);