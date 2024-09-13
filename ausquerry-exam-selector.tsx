import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Award, BookOpen, DollarSign } from 'lucide-react';

const examData = {
  'IELTS General': { price: 245, description: 'General English proficiency test for work or migration.' },
  'IELTS Academic': { price: 255, description: 'English proficiency test for higher education.' },
  'SELT': { price: 180, description: 'Secure English Language Test for UK visas.' },
  'IELTS UKVI General': { price: 260, description: 'UKVI version of IELTS General.' },
  'Pearson VUE': { price: 200, description: 'Computer-based testing for various certifications.' },
  'PLEB 1': { price: 190, description: 'Professional and Linguistic Assessment Board test.' },
  'IELTS UKVI Academic': { price: 270, description: 'UKVI version of IELTS Academic.' },
  'GRE': { price: 205, description: 'Graduate Record Examination for graduate school admissions.' },
  'GMAT': { price: 250, description: 'Graduate Management Admission Test for business school.' },
  'SAT': { price: 55, description: 'Scholastic Assessment Test for undergraduate admissions.' },
  'ACT': { price: 60, description: 'American College Testing for undergraduate admissions.' },
  'TOEFL': { price: 185, description: 'Test of English as a Foreign Language.' },
  'Only Transcripts': { price: 50, description: 'Submission of academic transcripts only.' },
  'OET': { price: 385, description: 'Occupational English Test for healthcare professionals.' },
  'CELPIP': { price: 280, description: 'Canadian English Language Proficiency Index Program.' },
  'KTE': { price: 150, description: 'Knowledge Test of English.' },
  'LSAT': { price: 200, description: 'Law School Admission Test.' },
  'GED': { price: 80, description: 'General Educational Development test.' },
  'Duolingo': { price: 49, description: 'Online English proficiency test.' }
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

  const getRecommendations = () => {
    let recommendedExams = [];

    if (checkCriteria({
      country: ['UK', 'Canada', 'Australia', 'alternatives'],
      activity: ['work', 'nursing', 'others'],
      takingTest: ['paper', 'computer', 'any'],
      cost: ['cheap', "don't mind"],
      transcript: ['1st class', '2nd class', 'certification', 'none'],
      scholarship: ['unimportant'],
      bringFamily: ['yes', 'no']
    })) recommendedExams.push('IELTS General');

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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Ausquerry Exam Selector
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Find the perfect exams for your international education journey
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Your Preferences
            </h2>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <Select onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger id="country" className="mt-1">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {['USA', 'Canada', 'Australia', 'UK', 'Finland', 'alternatives'].map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="activity" className="block text-sm font-medium text-gray-700">Activity</label>
                <Select onValueChange={(value) => handleInputChange('activity', value)}>
                  <SelectTrigger id="activity" className="mt-1">
                    <SelectValue placeholder="Select Activity" />
                  </SelectTrigger>
                  <SelectContent>
                    {['undergraduate', 'postgraduate', 'work', 'medical', 'nursing', 'Law school', 'short course', 'others'].map(activity => (
                      <SelectItem key={activity} value={activity}>{activity}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="takingTest" className="block text-sm font-medium text-gray-700">Taking the Test</label>
                <Select onValueChange={(value) => handleInputChange('takingTest', value)}>
                  <SelectTrigger id="takingTest" className="mt-1">
                    <SelectValue placeholder="Select Test Method" />
                  </SelectTrigger>
                  <SelectContent>
                    {['computer', 'paper', 'any'].map(method => (
                      <SelectItem key={method} value={method}>{method}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost</label>
                <Select onValueChange={(value) => handleInputChange('cost', value)}>
                  <SelectTrigger id="cost" className="mt-1">
                    <SelectValue placeholder="Select Cost Preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cheap">Cheap</SelectItem>
                    <SelectItem value="don't mind">Don't mind</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="transcript" className="block text-sm font-medium text-gray-700">Transcript</label>
                <Select onValueChange={(value) => handleInputChange('transcript', value)}>
                  <SelectTrigger id="transcript" className="mt-1">
                    <SelectValue placeholder="Select Transcript Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {['1st class', '2nd class', 'certification', 'none'].map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="scholarship" className="block text-sm font-medium text-gray-700">Scholarship</label>
                <Select onValueChange={(value) => handleInputChange('scholarship', value)}>
                  <SelectTrigger id="scholarship" className="mt-1">
                    <SelectValue placeholder="Select Scholarship Preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="unimportant">Unimportant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="bringFamily" className="block text-sm font-medium text-gray-700">Bring Family Members</label>
                <Select onValueChange={(value) => handleInputChange('bringFamily', value)}>
                  <SelectTrigger id="bringFamily" className="mt-1">
                    <SelectValue placeholder="Select Family Preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <Button onClick={getRecommendations} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Get Recommendations
            </Button>
          </div>
        </div>

        {recommendations.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Exams</h2>
            <p className="text-gray-600 mb-6">
              Based on your preferences, we recommend the following exams. Remember, you may be eligible for multiple exams.
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recommendations.map(exam => (
                <Card key={exam} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Award className="w-6 h-6 text-indigo-500 mr-2" />
                        <span>{exam}</span>
                      </span>
                      <span className="text-lg font-semibold text-green-600">${examData[exam].price}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{examData[exam].description}</p>
                    <div className="flex items-center">
                      <BookOpen className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="text-sm text-gray-600">Matches your preferences</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamSelector;
