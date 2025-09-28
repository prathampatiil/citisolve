import React, { createContext, useContext, useState } from 'react';

const ReportContext = createContext();

export function ReportProvider({ children }) {
  const [reports, setReports] = useState([]);

  const makeId = () => Math.random().toString(36).slice(2, 9);

  const addReport = ({
    title,
    description,
    image = null,
    coordinates = null,
    category = 'Mixed',
    segregationType = 'Mixed',
    createdBy = 'John Doe',
  }) => {
    const item = {
      id: makeId(),
      title: title || 'Untitled',
      description: description || '',
      image,
      coordinates,
      category,
      segregationType,
      status: 'Pending', // Flow: Pending → Accepted → Assigned → In Progress → Pending Verification → Completed
      history: ['Pending'],
      upvotes: [], // 👈 array of user ids/emails for upvotes
      contractor: null,
      assignedContractorType: null,
      completionPhoto: null,
      disposalCenter: null,
      comments: [],
      createdBy,
      createdAt: Date.now(),
    };
    setReports((prev) => [item, ...prev]);
  };

  const acceptReport = (reportId) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? { ...r, status: 'Accepted', history: [...r.history, 'Accepted'] }
          : r
      )
    );
  };

  const assignWork = (reportId, contractorName, contractorType = 'Waste') => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status: 'Assigned',
              contractor: contractorName,
              assignedContractorType: contractorType,
              history: [...r.history, `Assigned to ${contractorType}`],
            }
          : r
      )
    );
  };

  const acceptWork = (reportId, contractorName) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status: 'In Progress',
              contractor: contractorName,
              history: [...r.history, 'In Progress'],
            }
          : r
      )
    );
  };

  const submitCompletion = (reportId, completionPhotoUrl) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status: 'Pending Verification',
              completionPhoto: completionPhotoUrl,
              history: [...r.history, 'Pending Verification'],
            }
          : r
      )
    );
  };

  // ✅ Eco Drop submission
  const addEcoDrop = (wasteType, dropPoint, createdBy = 'John Doe') => {
    const item = {
      id: makeId(),
      title: 'Eco Drop Submission',
      description: `Waste dropped: ${wasteType} at ${dropPoint}`,
      image: null,
      coordinates: dropPoint,
      category: 'Eco Drop',
      segregationType: wasteType,
      status: 'Completed', // instantly marked as completed
      history: ['Completed'],
      upvotes: [],
      contractor: null,
      assignedContractorType: null,
      completionPhoto: null,
      disposalCenter: dropPoint,
      comments: [],
      createdBy,
      createdAt: Date.now(),
    };
    setReports((prev) => [item, ...prev]);
  };

  const verifyCompletion = (reportId) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? { ...r, status: 'Completed', history: [...r.history, 'Completed'] }
          : r
      )
    );
  };

  // ✅ Upvote system
  const upvoteReport = (reportId, user = 'John Doe') => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          // toggle upvote
          const alreadyUpvoted = r.upvotes.includes(user);
          return {
            ...r,
            upvotes: alreadyUpvoted
              ? r.upvotes.filter((u) => u !== user)
              : [...r.upvotes, user],
          };
        }
        return r;
      })
    );
  };

  return (
    <ReportContext.Provider
      value={{
        reports,
        addReport,
        addEcoDrop,
        acceptReport,
        assignWork,
        acceptWork,
        submitCompletion,
        verifyCompletion,
        upvoteReport, // 👈 exposed
      }}
    >
      {children}
    </ReportContext.Provider>
  );
}

export function useReports() {
  return useContext(ReportContext);
}
