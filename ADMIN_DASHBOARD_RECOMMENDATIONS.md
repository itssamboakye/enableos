# Admin Dashboard Recommendations

Based on the conversation, here's what I recommend for the EnableOS Admin Dashboard:

## 🎯 Core Features

### 1. **Platform Overview Dashboard**
- **Total Users**: Count of all registered users
- **Active Users**: Users who have practiced in the last 7/30 days
- **Total Sessions**: All-time session count
- **Sessions This Week/Month**: Time-based session metrics
- **Average Session Duration**: Overall platform average
- **Completion Rate**: % of sessions that were completed vs. aborted

### 2. **User Activity Analytics**
- **New Users Over Time**: Chart showing user growth
- **Session Activity Timeline**: Daily/weekly session volume
- **User Engagement**: Sessions per user distribution
- **Practice Frequency**: How often users are practicing
- **Peak Usage Times**: When users are most active

### 3. **User Management**
- **User List**: Searchable table of all users
  - Name, email, company, title
  - Total sessions completed
  - Last session date
  - Average scores
  - Account creation date
- **User Details**: Click to see individual user:
  - Full session history
  - Progress over time
  - Score trends
  - Practice patterns

### 4. **Session Analytics**
- **Session Quality Metrics**: Average scores across all sessions
  - Clarity, Curiosity, Listening, Flow Control, Confidence, Next Step
- **Session Completion Rate**: Completed vs. aborted sessions
- **Average Session Duration**: By call type (Discovery, Prospecting, etc.)
- **Most Common Buyer Contexts**: What scenarios users are practicing
- **Most Common Buyer Roles**: What roles users are practicing against

### 5. **Recent Activity Feed**
- **Live Activity Stream**: Recent sessions, new user signups
- **Filterable**: By date, user, session type
- **Quick Actions**: View session details, user profile

### 6. **Usage Patterns**
- **Feature Adoption**: Which practice types are most used
- **User Retention**: How many users come back after first session
- **Practice Consistency**: Users who practice regularly vs. one-time users
- **Drop-off Points**: Where users tend to end sessions early

## 🔒 Access Control

- **Admin-only routes**: `/admin/*`
- **Role-based middleware**: Protect admin routes
- **Admin users**: `luis@nson.ai` and `sam@nson.ai`
- **Visual indicator**: Admin badge/indicator in UI

## 📊 Implementation Priority

### Phase 1 (MVP):
1. ✅ User role system (admin/user)
2. ✅ Admin dashboard overview page
3. ✅ User list with basic stats
4. ✅ Platform metrics (total users, sessions, etc.)

### Phase 2:
5. Session analytics and charts
6. User detail pages
7. Recent activity feed
8. Export capabilities

### Phase 3:
9. Advanced analytics
10. Custom date ranges
11. User management actions
12. Email notifications for admins

## 🎨 Design Considerations

- **Clean, data-focused**: Charts and tables, not flashy
- **EnableOS aesthetic**: Match the calm, professional design
- **Quick insights**: Key metrics visible at a glance
- **Drill-down capability**: Click to see more details
- **Export options**: CSV/PDF exports for reporting
