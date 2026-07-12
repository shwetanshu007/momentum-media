/**
 * Analytics IDs shared by server and client code.
 * No "use client" here: app/layout.tsx (a server component) inlines these
 * into the gtag/pixel bootstrap scripts — importing them from a client
 * module would turn them into client-reference stubs on the server.
 */
export const META_PIXEL_ID = "2965537043641776";
export const GA_MEASUREMENT_ID = "G-5KH6KNXG1N";
