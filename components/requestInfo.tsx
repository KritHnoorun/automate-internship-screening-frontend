"use client";
import { API_URL } from "@/utils/config";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import axios from "axios";

interface RequestData {
  email: string;
  positions: string[] | string;
  resume: string;
}

interface RequestCardProps {
  email?: string;
}

const RequestInfo: React.FC<RequestCardProps> = ({ email }) => {
  const [existingRequest, setExistingRequest] = useState<RequestData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/requests/getRequest/${email}`
        );
        setExistingRequest(data.request);
        console.log("Fetched request data:", data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchRequest();
  }, [email]);

  if (error) return <p>Error: {error}</p>;
  if (!existingRequest) return <p>Loading request details...</p>;

  const resumeUrl = existingRequest.resume.startsWith("http")
    ? existingRequest.resume
    : `${existingRequest.resume}`;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Request Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <strong>Email:</strong> {existingRequest.email}
        </div>
        <div>
          <strong>Positions:</strong>{" "}
          {Array.isArray(existingRequest.positions)
            ? existingRequest.positions.join(", ")
            : existingRequest.positions}
        </div>
        <div>
          <strong>Resume:</strong>{" "}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Resume
          </a>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 mt-4"></CardFooter>
    </Card>
  );
};

export default RequestInfo;
