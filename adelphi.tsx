import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const examPrices = {
  'IELTS General': 245,
  'IELTS Academic': 255,
  'SELT': 180,
  'IELTS UKVI General': 260,
  'Pearson VUE': 200,
  'PLEB 1': 190,
  'IELTS UKVI Academic': 270,
  'GRE': 205,
  'GMAT': 250,
  'SAT': 55,
  'ACT': 60,
  'TOEFL': 185,
  'Only Transcripts': 50,
  'OET': 385,
  'CELPIP': 280,
  'KTE': 150,
  'LSAT': 200,
  'GED': 80,
  'Duolingo': 49
};

const ExamSelector = () => {
  const [userInputs, setUserInputs] = useState({
    country: '',
    activity: '',
    takingTest: '',
    cost: '',
    transcript: '',
    scholarship: '',
    bringFamily: ''
  });
  const [recommendations, setRecommendations] = useState([]);

  const handleInputChange = (field, value) => {
    setUserInputs(prev => ({ ...prev, [field]: value }));
  };

  const getRecommendations = () => {
    const { country, activity, takingTest, cost, transcript, scholarship, bringFamily } = userInputs;
    let recommendedExams = [];

    const checkCriteria = (examCriteria) => {
      let matchCount = 0;
      const totalCriteria = Object.keys(examCriteria).length;

      for (const [key, value] of Object.entries(examCriteria)) {
        if (Array.isArray(value)) {
          if (value.includes(userInputs[key])) matchCount++;
        } else if (value === userInputs[key]) {
          matchCount++;
        }
      }

      return matchCount >= totalCriteria - 1; // Allow one mismatch
    };

    // IELTS General
    if (checkCriteria({
      country: ['UK', 'Canada', 'Australia', 'alternatives'],
      activity: ['work', 'nursing', 'others'],
      takingTest: ['paper', 'computer', 'any'],
      cost: ['cheap', "don't mind"],
      transcript: ['1st class', '2nd class', 'certification', 'none'],
      scholarship: ['unimportant'],
      bringFamily: ['yes', 'no']
    })) recommendedExams.push('IELTS General');

    // IELTS Academic
    if (checkCriteria({
      country: ['Australia', 'UK', 'Canada', 'USA', 'Finland', 'alternatives'],
      activity: ['undergraduate', 'postgraduate', 'Law School', 'short course', 'others'],
      takingTest: ['computer', 'paper', 'any'],
      cost: ['cheap', "don't mind"],
      transcript: ['1st class', '2nd class', 'certification', 'none'],
      scholarship: ['available', 'unimportant'],
      bringFamily: ['yes', 'no']
    })) recommendedExams.push('IELTS Academic');

    // Add similar checks for other exams...

    // Duolingo
    if (checkCriteria({
      country: ['USA', 'Finland', 'alternatives'],
      activity: ['undergraduate', 'postgraduate', 'work', 'short course', 'others'],
      takingTest: ['computer'],
      cost: ['cheap'],
      transcript: ['1st class', '2nd class', 'certification', 'none'],
      scholarship: ['available', 'unimportant'],
      bringFamily: ['yes', 'no']
    })) recommendedExams.push('Duolingo');

    setRecommendations(recommendedExams);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Exam Selector</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
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
            <SelectItem value="alternatives">Alternatives</SelectItem>
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
            <SelectItem value="medical">Medical</SelectItem>
            <SelectItem value="nursing">Nursing</SelectItem>
            <SelectItem value="lawSchool">Law School</SelectItem>
            <SelectItem value="shortCourse">Short Course</SelectItem>
            <SelectItem value="others">Others</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleInputChange('takingTest', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Test Taking Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="computer">Computer</SelectItem>
            <SelectItem value="paper">Paper</SelectItem>
            <SelectItem value="any">Any</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleInputChange('cost', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Cost Preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cheap">Cheap</SelectItem>
            <SelectItem value="don't mind">Don't Mind</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleInputChange('transcript', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Transcript Type" />
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
            <SelectValue placeholder="Scholarship" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="unimportant">Unimportant</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleInputChange('bringFamily', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Bring Family Members" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={getRecommendations} className="mb-4">Get Recommendations</Button>

      <div className="grid grid-cols-2 gap-4">
        {recommendations.map(exam => (
          <Card key={exam}>
            <CardHeader>
              <CardTitle>{exam}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Price: ${examPrices[exam]}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExamSelector;
