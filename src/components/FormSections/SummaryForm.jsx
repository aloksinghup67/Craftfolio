import React from 'react';
import { useResumeContext } from '../../context/ResumeContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';

const SummaryForm = () => {
  const { resumeData, updateSummary } = useResumeContext();

  const handleSummaryChange = (e) => {
    updateSummary(e.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Textarea
              placeholder="Write a brief summary of your professional background and career objectives..."
              value={resumeData.summary || ''}
              onChange={handleSummaryChange}
              className="min-h-[150px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryForm; 