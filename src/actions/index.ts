import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
    searchIpAction: defineAction({
        accept: "form",
        input: z.object({
            searchIp: z.string(),
        }),
        handler: async ({ searchIp }) => {  try {
        const searchIpResponse = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.KEY}&ipAddress=${searchIp}`
        );
        
        if (!searchIpResponse.ok) {
          throw new Error(`API responded with status: ${searchIpResponse.status}`);
        }
        
        const searchIpData = await searchIpResponse.json();
        return searchIpData;
      } catch (error) {
        console.error("Error fetching IP data:", error);
        return null;
      }}
    })
}