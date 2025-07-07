// src/app/page.tsx

"use client"; // This is a client component, because we're using state

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { quotes } from "@/lib/quotes";
import { Twitter } from "lucide-react"; // Icon library

// Define the shape of a single quote object
interface Quote {
  quote: string;
  author: string;
}

export default function Home() {
  // State to hold the current quote. Initialize with a random quote.
  const [quote, setQuote] = useState<Quote | null>(null);

  // Function to get a new random quote
  const getNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  // useEffect hook to set the initial quote when the component mounts
  useEffect(() => {
    getNewQuote();
  }, []); // The empty array means this effect runs only once on mount

  // Twitter share link
  const twitterShareUrl = quote
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `"${quote.quote}" - ${quote.author}`
      )}`
    : "";

  return (
    <main className="p-4">
      <Card className="w-[350px] md:w-[600px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Random Quote Generator</CardTitle>
        </CardHeader>
			<CardContent className="text-center min-h-[120px] flex flex-col justify-center">
			{quote ? (
				<>
				<p className="text-lg md:text-xl font-medium">
        			“{quote.quote}”
      			</p>
      			<p className="text-sm text-muted-foreground mt-4">
        			- {quote.author}
     			</p>
				</>
			) : (
				<p>Loading quote...</p>
			)}
			</CardContent>
        <CardFooter className="flex justify-between">
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={!quote ? "pointer-events-none" : ""}
          >
            <Button variant="outline" disabled={!quote}>
              <Twitter className="mr-2 h-4 w-4" /> Tweet
            </Button>
          </a>
          <Button onClick={getNewQuote}>New Quote</Button>
        </CardFooter>
      </Card>
    </main>
  );
}