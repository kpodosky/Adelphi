import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const TestSelector = () => {
  const [inputs, setInputs] = useState({
    country: '',
    activity: '',
    testFormat: '',
    cost: '',
    transcript: '',
    scholarship: '',
    family: ''
  });

  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);

  const handleInputChange = (name, value) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const filterTests = () => {
    const tests = [
      { name: "IELTS General", criteria: ["UK", "Canada", "Australia", "alternatives"], activities: ["work", "nursing", "others"], formats: ["paper", "computer", "any"], costs: ["cheap", "don't mind"], transcripts: ["1st class", "2nd class", "certification", "none"], scholarships: ["unimportant"], family: ["yes", "no"] },
      { name: "IELTS Academic", criteria: ["Australia", "UK", "Canada", "USA", "Finland", "alternatives"], activities: ["undergraduate", "postgraduate", "Law School", "short course", "others"], formats: ["computer", "paper", "any"], costs: ["cheap", "don't mind"], transcripts: ["1st class", "2nd class", "certification", "none"], scholarships: ["available", "unimportant"], family: ["yes", "no"] },
      { name: "SELT", criteria: ["UK"], activities: ["nursing", "medical"], formats: ["computer"], costs: ["don't mind"], transcripts: ["certification", "none"], scholarships: ["unimportant"], family: ["yes", "no"] },
      { name: "IELTS UKVI General", criteria: ["UK"], activities: ["work", "nursing"], formats: ["computer", "paper", "any"], costs: ["cheap", "don't mind"], transcripts: ["1st class", "2nd class", "certification", "none"], scholarships: ["available", "unimportant"], family: ["yes", "no"] },
      { name: "Pearson VUE", criteria: ["USA", "Canada", "alternatives"], activities: ["undergraduate", "postgraduate"], formats: ["computer"], costs: ["cheap", "don't mind"], transcripts: ["1st class", "2nd class", "none"], scholarships: ["available", "unimportant"], family: ["yes", "no"] },
      { name: "PLEB 1", criteria: ["UK"], activities: ["Medical"], formats: ["computer"], costs: ["cheap", "don't mind"], transcripts: ["certification"], scholarships: ["available", "unimportant"], family: ["yes", "no"] },
      { name: "IELTS UKVI Academic", criteria: ["UK"], activities: ["undergraduate", "postgraduate", "Nursing", "short course", "others"], formats: ["computer"], costs: ["cheap", "don't mind"], transcripts: ["1st class", "2nd class", "certification"], scholarships: ["available", "unimportant"], family: ["yes"] },
      { name: "GRE", criteria: ["USA", "Australia", "alternatives"], activities: ["postgraduate"], formats: ["computer"], costs: ["cheap", "don't mind"], transcripts: ["1st class", "2nd class"], scholarships: ["available", "unimportant"], family: ["yes", "no"] },
      { name: "GMAT", criteria: ["USA", "Australia", "alternatives"], activities: ["postgraduate"], formats: ["computer"], costs: ["cheap", "don't mind"], transcripts: ["1st class", "2nd class"], scholarships: ["available", "unimportant"], family: ["yes", "no"] },
      { name: "SAT", criteria: ["USA"], activities: ["undergraduate"], formats: ["computer"], costs: ["cheap"], transcripts: ["none"], scholarships: ["available", "unimportant"], family: ["no"] },
      { name: "ACT", criteria: ["USA"], activities: ["undergraduate"], formats: ["computer"], costs: ["cheap", "don't mind"], transcripts: ["none"], scholarships: ["available", "unimportant"], family: ["no"] },
      { name: "TOEFL", criteria: ["USA", "Canada", "Finland"], activities: ["undergraduate", "postgraduate", "short course", "Law school", "Nursing", "others"], formats: ["computer"], costs: ["cheap", "don't mind"], transcripts: ["1st class", "2nd class", "certification", "none"], scholarships: ["available", "unimportant"], family: ["yes", "no"] },
      { name: "Only Transcripts", criteria: ["UK", "USA", "Australia", "Canada", "Finland"], activities: ["Undergraduate", "postgraduate", "short course", "Law school", "others"], formats: ["computer"], costs: ["cheap", "don't mind"], transcripts: ["1st class", "2nd class"], scholarships: ["available", "unimportant"], family: ["yes", "no"] },
      { name: "OET", criteria: ["USA", "Canada", "alternatives"], activities: ["nursing", "Medical"], formats: ["computer"], costs: ["don't mind"], transcripts: ["none"], scholarships: ["unimportant"], family: ["yes", "no"] },
      { name: "CELPIP", criteria: ["Canada"], activities: ["nursing"], formats: ["computer"], costs: ["cheap", "don't mind"], transcripts: ["none"], scholarships: ["unimportant"], family: ["yes", "no"] },
      { name: "KTE", criteria: ["USA", "UK", "alternatives"], activities: ["undergraduate", "postgraduate"], formats: ["computer"], costs: ["cheap", "don't mind"], transcripts: ["1st class", "2nd class"], scholarships: ["available", "unimportant"], family: ["yes", "no"] },
      { name: "LSAT", criteria: ["USA"], activities: ["Law school"], formats: ["computer"], costs: ["cheap", "don't mind"], transcripts: ["1st class", "2nd class"], scholarships: ["available", "unimportant"], family: ["yes", "no"] },
      { name: "GED", criteria: ["USA"], activities: ["undergraduate"], formats: ["computer"], costs: ["don't mind"], transcripts: ["none"], scholarships: ["available", "unimportant"], family: ["no"] },
      { name: "Duolingo", criteria: ["USA", "Finland", "alternatives"], activities: ["undergraduates", "postgraduates", "work", "short course", "others"], formats: ["computer"], costs: ["cheap"], transcripts: ["1st class", "2nd class", "certification", "none"], scholarships: ["available", "unimportant"], family: ["yes", "no"] }
    ];

    const matchedTests = tests.filter(test => {
      let matches = 0;
      if (test.criteria.includes(inputs.country)) matches++;
      if (test.activities.includes(inputs.activity)) matches++;
      if (test.formats.includes(inputs.testFormat)) matches++;
      if (test.costs.includes(inputs.cost)) matches++;
      if (test.transcripts.includes(inputs.transcript)) matches++;
      if (test.scholarships.includes(inputs.scholarship)) matches++;
      if (test.family.includes(inputs.family)) matches++;
      
      // Allow for one mismatch (6 out of 7 criteria)
      return matches >= 6;
    });

    if (matchedTests.length === 0) {
      let suggestion = "";
      if (inputs.testFormat === "paper") {
        suggestion = "There is no paper-based test for this combination. Try changing your choice to computer-based to get a better result.";
      } else {
        suggestion = "No tests match your criteria. Try adjusting your selections.";
      }
      setResults([suggestion]);
    } else {
      setResults(matchedTests.map(test => test.name));
    }
    setOpen(true);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Test Selector</CardTitle>
        <CardDescription>Find the right test for your needs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <Select onValueChange={(value) => handleInputChange('country', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
              <SelectItem value="UK">UK</SelectItem>
              <SelectItem value="Finland">Finland</SelectItem>
              <SelectItem value="alternatives">Other</SelectItem>
            </SelectContent>
          </Select>
          
          <Select onValueChange={(value) => handleInputChange('activity', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Activity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="undergraduate">Undergraduate</SelectItem>
              <SelectItem value="postgraduate">Postgraduate</SelectItem>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="Medical">Medical</SelectItem>
              <SelectItem value="nursing">Nursing</SelectItem>
              <SelectItem value="Law school">Law School</SelectItem>
              <SelectItem value="short course">Short Course</SelectItem>
              <SelectItem value="others">Other</SelectItem>
            </SelectContent>
          </Select>
          
          <Select onValueChange={(value) => handleInputChange('testFormat', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Test Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="computer">Computer</SelectItem>
              <SelectItem value="paper">Paper</SelectItem>
              <SelectItem value="any">Any</SelectItem>
            </SelectContent>
          </Select>
          
          <Select onValueChange={(value) => handleInputChange('cost', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Cost Preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cheap">Cheap</SelectItem>
              <SelectItem value="don't mind">Don't Mind</SelectItem>
            </SelectContent>
          </Select>
          
          <Select onValueChange={(value) => handleInputChange('transcript', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Transcript" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1st class">1st Class</SelectItem>
              <SelectItem value="2nd class">2nd Class</SelectItem>
              <SelectItem value="certification">Certification</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
          
          <Select onValueChange={(value) => handleInputChange('scholarship', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Scholarship Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="unimportant">Unimportant</SelectItem>
            </SelectContent>
          </Select>
          
          <Select onValueChange={(value) => handleInputChange('family', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Bringing Family Members" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={filterTests}>Find Tests</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Recommended Tests</DialogTitle>
              <DialogDescription>
                Based on your selections, here are the recommended tests:
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {results.map((result, index) => (
                <div key={index} className="text-sm">{result}</div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default TestSelector;
