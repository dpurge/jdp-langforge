import { assertEquals } from "./test_deps.ts";

// Deno.test(
//     "hello world #4",
//     { permissions: { read: true } },
//     () => {
//         const x = 1 + 2;
//         assertEquals(x, 3);
//     }
// );

Deno.test(
    "hello world #1",
    () => {
        const x = 1 + 2;
        assertEquals(x, 3);
    }
);

