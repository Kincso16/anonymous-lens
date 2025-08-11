import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface FeedbackFormProps {
  subjects: { id: string; name: string }[];
  teachers: { id: string; name: string }[];
}

const grades = Array.from({ length: 8 }).map((_, i) => String(5 + i));

export function FeedbackForm({ subjects, teachers }: FeedbackFormProps) {
  const [grade, setGrade] = useState<string>("");
  const [subjectId, setSubjectId] = useState<string>("");
  const [teacherId, setTeacherId] = useState<string>("");
  const [q1, setQ1] = useState<string>("");
  const [q2, setQ2] = useState<string>("");
  const [comments, setComments] = useState<string>("");

  const onSaveDraft = () => {
    toast("Draft saved locally. Connect backend to persist across sessions.");
  };

  const onSubmit = () => {
    if (!grade || !subjectId || !teacherId || !q1 || !q2) {
      toast("Please complete all required fields.");
      return;
    }
    toast("Submission ready. Enable Supabase to store anonymously.");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Anonymous Feedback</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="grade">Grade</Label>
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger id="grade">
                <SelectValue placeholder="Select grade (5–12)" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((g) => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select value={subjectId} onValueChange={setSubjectId}>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="teacher">Teacher</Label>
            <Select value={teacherId} onValueChange={setTeacherId}>
              <SelectTrigger id="teacher">
                <SelectValue placeholder="Select teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((t) => (
                  <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>1) The teacher explains concepts clearly.</Label>
          <RadioGroup value={q1} onValueChange={setQ1} className="grid grid-cols-5 gap-2">
            {["1","2","3","4","5"].map((v) => (
              <div key={v} className="flex items-center space-x-2">
                <RadioGroupItem id={`q1-${v}`} value={v} />
                <Label htmlFor={`q1-${v}`}>{v}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>2) The class is engaging and well-structured.</Label>
          <RadioGroup value={q2} onValueChange={setQ2} className="grid grid-cols-5 gap-2">
            {["1","2","3","4","5"].map((v) => (
              <div key={v} className="flex items-center space-x-2">
                <RadioGroupItem id={`q2-${v}`} value={v} />
                <Label htmlFor={`q2-${v}`}>{v}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comments">Optional comments</Label>
          <Textarea id="comments" value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Share constructive feedback (anonymous)" />
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onSaveDraft}>Save draft</Button>
          <Button variant="default" onClick={onSubmit}>Submit</Button>
        </div>
      </CardContent>
    </Card>
  );
}
