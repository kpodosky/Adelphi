import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const TestSelector = () => {
  const [inputs, setInputs] = useState({
    location: '',
    activity: '',
    testFormat: '',
    cost: '',
    transcript: '',
    family: ''
  });

  const [results, setResults] = useState([]);

  const handleInputChange = (name, value) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const filterTests = () => {
    const tests = [
      { name: "IELTS General", criteria: ["UK", "Canada", "Ireland", "Australia", "any"], activities: ["work", "nursing", "social services"], formats: ["paper", "computer", "any"], costs: ["cheap", "normal", "any"], transcripts: ["none"], family: ["yes", "no", "any"] },
      { name: "IELTS Academic", criteria: ["Australia", "Ireland", "Canada", "Finland", "any"], activities: ["Undergraduate", "Masters", "PhD"], formats: ["paper", "computer", "any"], costs: ["cheap", "any"], transcripts: ["1st class", "2nd class", "none"], family: ["yes", "no", "any"] },
      { name: "SELT", criteria: ["UK", "Europe", "Canada", "Ireland"], activities: ["nursing", "social services"], formats: ["computer"], costs: ["normal", "any"], transcripts: ["none"], family: ["yes", "no", "any"] },
      { name: "IELTS UKVI General", criteria: ["Canada", "Europe", "Australia", "UK", "Ireland", "Finland", "any"], activities: ["work", "nursing", "social services"], formats: ["paper", "computer", "any"], costs: ["cheap", "normal", "any"], transcripts: ["none"], family: ["yes"] },
      { name: "Pearson VUE", criteria: ["USA", "Europe", "Finland"], activities: ["undergraduate", "Masters", "PhD"], formats: ["computer"], costs: ["normal", "any"], transcripts: ["1st class", "2nd class", "none"], family: ["yes", "no", "any"] },
      { name: "PLEB 1", criteria: ["UK"], activities: ["doctor"], formats: ["paper", "computer", "any"], costs: ["normal", "any"], transcripts: ["certification"], family: ["yes", "any"] },
      { name: "IELTS UKVI Academic", criteria: ["UK"], activities: ["undergraduate", "Masters", "PhD"], formats: ["paper", "computer", "any"], costs: ["normal", "any"], transcripts: ["1st class", "2nd class", "certification"], family: ["yes", "no", "any"] },
      { name: "GRE", criteria: ["USA", "Finland", "Australia"], activities: ["Masters", "PhD"], formats: ["computer", "any"], costs: ["cheap", "normal", "discount", "any"], transcripts: ["1st class", "2nd class"], family: ["yes", "no", "any"] },
      { name: "GMAT", criteria: ["USA", "Finland", "Australia"], activities: ["Masters", "PhD"], formats: ["computer", "any"], costs: ["normal", "any"], transcripts: ["1st class", "2nd class", "any"], family: ["yes", "no", "any"] },
      { name: "SAT", criteria: ["USA"], activities: ["undergraduate"], formats: ["computer", "any"], costs: ["cheap", "normal", "any"], transcripts: ["none"], family: ["yes", "no", "any"] },
      { name: "TOEFL", criteria: ["USA"], activities: ["undergraduate", "Masters", "PhD"], formats: ["computer", "any"], costs: ["cheap", "normal", "any"], transcripts: ["none"], family: ["yes", "no", "any"] },
      { name: "Transcript", criteria: ["UK", "Ireland", "Canada", "Finland"], activities: ["Undergraduate", "Masters", "PhD"], formats: ["paper", "computer", "any"], costs: ["cheap", "any"], transcripts: ["1st class", "2nd class", "certification"], family: ["yes", "no", "any"] },
      { name: "OET", criteria: ["UK", "Ireland"], activities: ["nursing", "social services", "Doctors", "Medical"], formats: ["paper", "computer", "any"], costs: ["cheap", "normal", "any"], transcripts: ["none"], family: ["yes", "no", "any"] },
      { name: "CELPIP", criteria: ["Canada"], activities: ["nursing", "social services", "work"], formats: ["computer", "paper", "any"], costs: ["normal", "any"], transcripts: ["none"], family: ["yes", "any"] },
      { name: "KTE", criteria: ["USA", "UK", "any"], activities: ["undergraduate", "Masters", "PhD"], formats: ["computer"], costs: ["normal", "any"], transcripts: ["none", "any"], family: ["no"] }
    ];

    const matchedTests = tests.filter(test => {
      let matches = 0;
      if (test.criteria.includes(inputs.location) || test.criteria.includes("any")) matches++;
      if (test.activities.includes(inputs.activity)) matches++;
      if (test.formats.includes(inputs.testFormat) || test.formats.includes("any")) matches++;
      if (test.costs.includes(inputs.cost) || test.costs.includes("any")) matches++;
      if (test.transcripts.includes(inputs.transcript) || test.transcripts.includes("any")) matches++;
      if (test.family.includes(inputs.family) || test.family.includes("any")) matches++;
      
      // Allow for one mismatch (5 out of 6 criteria)
      return matches >= 5;
    });

    setResults(matchedTests);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Test Selector</CardTitle>
        <CardDescription>Find the right test for your needs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Select onValueChange={(value) => handleInputChange('location', value)}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
                <SelectItem value="Ireland">Ireland</SelectItem>
                <SelectItem value="Finland">Finland</SelectItem>
                <SelectItem value="any">Any</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Select onValueChange={(value) => handleInputChange('activity', value)}>
              <SelectTrigger id="activity">
                <SelectValue placeholder="Activity" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="undergraduate">Undergraduate</SelectItem>
                <SelectItem value="Masters">Masters</SelectItem>
                <SelectItem value="PhD">PhD</SelectItem>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="nursing">Nursing</SelectItem>
                <SelectItem value="social services">Social Services</SelectItem>
                <SelectItem value="Doctors">Doctors</SelectItem>
                <SelectItem value="Short course">Short Course</SelectItem>
                <SelectItem value="Medical">Medical</SelectItem>
                <SelectItem value="Law">Law</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Select onValueChange={(value) => handleInputChange('testFormat', value)}>
              <SelectTrigger id="testFormat">
                <SelectValue placeholder="Test Format" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="paper">Paper</SelectItem>
                <SelectItem value="computer">Computer</SelectItem>
                <SelectItem value="any">Any</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Select onValueChange={(value) => handleInputChange('cost', value)}>
              <SelectTrigger id="cost">
                <SelectValue placeholder="Cost" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="cheap">Cheap</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="any">Any</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Select onValueChange={(value) => handleInputChange('transcript', value)}>
              <SelectTrigger id="transcript">
                <SelectValue placeholder="Transcript" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="1st class">1st Class</SelectItem>
                <SelectItem value="2nd class">2nd Class</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Select onValueChange={(value) => handleInputChange('family', value)}>
              <SelectTrigger id="family">
                <SelectValue placeholder="Bring Family Members" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="any">Any</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={filterTests}>Find Tests</Button>
      </CardFooter>
      {results.length > 0 && (
        <CardContent>
          <h3 className="font-semibold mb-2">Recommended Tests:</h3>
          <ul className="list-disc pl-5">
            {results.map((test, index) => (
              <li key={index}>{test.name}</li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  );
};

export default TestSelector;
