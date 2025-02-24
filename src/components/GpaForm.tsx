import React, { useState } from 'react';

const GpaForm: React.FC = () => {
  const [courses, setCourses] = useState<{ name: string; grade: string; credits: number }[]>([]);
  const [courseName, setCourseName] = useState('');
  const [grade, setGrade] = useState('');
  const [credits, setCredits] = useState(0);

  const addCourse = () => {
    if (courseName && grade && credits) {
      setCourses([...courses, { name: courseName, grade, credits }]);
      setCourseName('');
      setGrade('');
      setCredits(0);
    }
  };

  const calculateGpa = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const gradePoints = getGradePoints(course.grade);
      totalPoints += gradePoints * course.credits;
      totalCredits += course.credits;
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const getGradePoints = (grade: string) => {
    switch (grade) {
      case 'A':
        return 4.0;
      case 'B':
        return 3.0;
      case 'C':
        return 2.0;
      case 'D':
        return 1.0;
      case 'F':
        return 0.0;
      default:
        return 0.0;
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">GPA Calculator</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Course Name</label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Grade</label>
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Grade</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Credits</label>
        <input
          type="number"
          value={credits}
          onChange={(e) => setCredits(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={addCourse}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Course
      </button>
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Courses</h3>
        <ul>
          {courses.map((course, index) => (
            <li key={index} className="mb-2">
              {course.name} - {course.grade} ({course.credits} credits)
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">GPA</h3>
        <p className="text-2xl font-bold">{calculateGpa()}</p>
      </div>
    </div>
  );
};

export default GpaForm;
