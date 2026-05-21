"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { SparklesIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

const suggestions = [
  "Historic Story",
  "Kids Story",
  "Movie Stories",
  "AI Innovations",
  "Space Mysteries",
  "Horror Stories",
  "Mythological Tales",
  "Tech Breakthroughs",
  "True Crime Stories",
  "Fantasy Adventures",
  "Science Experiments",
  "Motivational Stories",
];

function Topic({ onHandleInputChange }) {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedScriptIndex, setSelectedScriptIndex] = useState();
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(false);
const GenerateScript = async () => {
  if (!selectedTopic) return;

  setLoading(true);

  try {
    const res = await axios.post("/api/generate-script", {
      topic: selectedTopic,
    });

    console.log("RESULT:", res.data);

    setScripts(res.data?.scripts || []);
  } catch (e) {
    console.log("ERROR:", e?.response?.data || e.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <h2 className="mb-1">Project Title</h2>

      <Input
        placeholder="Enter Project title"
        onChange={(event) =>
          onHandleInputChange("title", event.target.value)
        }
      />

      <div className="mt-5">
        <h2>Video Topic</h2>
        <p className="text-sm text-gray-600">
          Select topic for your video
        </p>

        <Tabs defaultValue="suggestion" className="w-full mt-2">
          <TabsList>
            <TabsTrigger value="suggestion">
              Suggestions
            </TabsTrigger>
            <TabsTrigger value="your_topic">
              Your Topic
            </TabsTrigger>
          </TabsList>

          {/* Suggestions */}
          <TabsContent value="suggestion">
            <div>
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`m-1 ${
                    suggestion === selectedTopic
                      ? "bg-secondary"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedTopic(suggestion);
                    onHandleInputChange("topic", suggestion);
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </TabsContent>

          {/* Custom Topic */}
          <TabsContent value="your_topic">
            <div>
              <h2>Enter your own topic</h2>
              <Textarea
                placeholder="Enter your topic"
                onChange={(event) =>
                  onHandleInputChange("topic", event.target.value)
                }
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Scripts */}
        {scripts?.length > 0 && (
          <div className="mt-4">
            <h2>Select the Script</h2>

            <div className="grid grid-cols-2 gap-5">
              {scripts.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-lg mt-3 cursor-pointer ${
                    selectedScriptIndex === index
                      ? "border-white bg-secondary"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedScriptIndex(index);

                    // ✅ IMPORTANT: store ONLY string
                    onHandleInputChange("script", item.content);
                  }}
                >
                  <h2 className="line-clamp-4 text-sm text-gray-300">
                    {item.content}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Button
        className="mt-3"
        size="sm"
        disabled={loading}
        onClick={GenerateScript}
      >
        {loading ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <SparklesIcon />
        )}
        Generate Script
      </Button>
    </div>
  );
}

export default Topic;