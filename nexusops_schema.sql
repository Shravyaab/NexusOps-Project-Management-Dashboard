-- =============================================================
-- NexusOps Project Management — Database Schema & Seed Data
-- Compatible with: PostgreSQL 14+
-- Generated for: PM Dashboard (all 7 modules)
-- =============================================================

-- ──────────────────────────────────────
-- EXTENSIONS
-- ──────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- gen_random_uuid()

-- ──────────────────────────────────────
-- ENUMS
-- ──────────────────────────────────────
CREATE TYPE work_mode      AS ENUM ('Remote', 'Hybrid', 'On-site');
CREATE TYPE team_role      AS ENUM ('Director', 'Manager', 'Team Lead', 'Employee');
CREATE TYPE task_stage     AS ENUM ('Not Started', 'In Progress', 'In Review', 'Completed', 'On Hold');
CREATE TYPE task_priority  AS ENUM ('High', 'Medium', 'Low');
CREATE TYPE subtask_status AS ENUM ('To Do', 'In Progress', 'Done', 'Blocked');

-- ──────────────────────────────────────
-- DEPARTMENTS
-- ──────────────────────────────────────
CREATE TABLE departments (
    id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    name       VARCHAR(100) NOT NULL UNIQUE,
    icon       VARCHAR(10),
    work_mode  work_mode   NOT NULL DEFAULT 'Hybrid',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ──────────────────────────────────────
-- TEAM MEMBERS  (self-reference for reports_to)
-- ──────────────────────────────────────
CREATE TABLE team_members (
    id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    dept_id       UUID        REFERENCES departments(id) ON DELETE SET NULL,
    reports_to_id UUID        REFERENCES team_members(id) ON DELETE SET NULL,
    name          VARCHAR(120) NOT NULL,
    role          team_role   NOT NULL,
    work_mode     work_mode   NOT NULL DEFAULT 'Hybrid',
    hourly_rate   NUMERIC(8,2) NOT NULL DEFAULT 0,
    hours_logged  INT          NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- ──────────────────────────────────────
-- SUB-DEPARTMENTS  (lead = team member)
-- ──────────────────────────────────────
CREATE TABLE sub_departments (
    id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    dept_id       UUID        NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    lead_person_id UUID       REFERENCES team_members(id) ON DELETE SET NULL,
    name          VARCHAR(100) NOT NULL,
    work_mode     work_mode   NOT NULL DEFAULT 'Hybrid',
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (dept_id, name)
);

-- Back-fill sub_dept_id onto team_members
ALTER TABLE team_members
    ADD COLUMN sub_dept_id UUID REFERENCES sub_departments(id) ON DELETE SET NULL;

-- ──────────────────────────────────────
-- PROJECTS
-- ──────────────────────────────────────
CREATE TABLE projects (
    id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    dept_id          UUID         REFERENCES departments(id) ON DELETE SET NULL,
    lead_person_id   UUID         REFERENCES team_members(id) ON DELETE SET NULL,
    name             VARCHAR(200) NOT NULL,
    work_mode        work_mode    NOT NULL DEFAULT 'Hybrid',
    allocated_budget NUMERIC(12,2) NOT NULL DEFAULT 0,
    spent_budget     NUMERIC(12,2) NOT NULL DEFAULT 0,
    due_date         DATE,
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT chk_budget CHECK (spent_budget >= 0 AND allocated_budget >= 0)
);

-- ──────────────────────────────────────
-- SPRINTS
-- ──────────────────────────────────────
CREATE TABLE sprints (
    id           UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    name         VARCHAR(100) NOT NULL UNIQUE,
    goal         TEXT,
    start_date   DATE         NOT NULL,
    end_date     DATE         NOT NULL,
    budget       NUMERIC(12,2) NOT NULL DEFAULT 0,
    budget_spent NUMERIC(12,2) NOT NULL DEFAULT 0,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT chk_sprint_dates CHECK (end_date > start_date)
);

-- ──────────────────────────────────────
-- TASKS
-- ──────────────────────────────────────
CREATE TABLE tasks (
    id           UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id  UUID          REFERENCES team_members(id) ON DELETE SET NULL,
    dept_id      UUID          REFERENCES departments(id) ON DELETE SET NULL,
    sub_dept_id  UUID          REFERENCES sub_departments(id) ON DELETE SET NULL,
    project_id   UUID          REFERENCES projects(id) ON DELETE SET NULL,
    sprint_id    UUID          REFERENCES sprints(id) ON DELETE SET NULL,
    name         VARCHAR(200)  NOT NULL,
    stage        task_stage    NOT NULL DEFAULT 'Not Started',
    priority     task_priority NOT NULL DEFAULT 'Medium',
    work_mode    work_mode     NOT NULL DEFAULT 'Hybrid',
    slot_start   TIME,
    slot_end     TIME,
    due_date     DATE,
    created_at   TIMESTAMPTZ   NOT NULL DEFAULT now(),
    CONSTRAINT chk_slot CHECK (slot_end > slot_start OR slot_end IS NULL)
);

-- ──────────────────────────────────────
-- SUB-TASKS  (daily steps)
-- ──────────────────────────────────────
CREATE TABLE sub_tasks (
    id               UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id          UUID           NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    assigned_to      UUID           REFERENCES team_members(id) ON DELETE SET NULL,
    name             VARCHAR(200)   NOT NULL,
    task_date        DATE           NOT NULL,
    estimated_hours  NUMERIC(5,2)   NOT NULL DEFAULT 0,
    actual_hours     NUMERIC(5,2)   NOT NULL DEFAULT 0,
    status           subtask_status NOT NULL DEFAULT 'To Do',
    notes            TEXT,
    created_at       TIMESTAMPTZ    NOT NULL DEFAULT now(),
    CONSTRAINT chk_hours CHECK (estimated_hours >= 0 AND actual_hours >= 0)
);

-- ──────────────────────────────────────
-- INDEXES
-- ──────────────────────────────────────
CREATE INDEX idx_team_dept        ON team_members(dept_id);
CREATE INDEX idx_team_reports     ON team_members(reports_to_id);
CREATE INDEX idx_team_subdept     ON team_members(sub_dept_id);
CREATE INDEX idx_subdept_dept     ON sub_departments(dept_id);
CREATE INDEX idx_proj_dept        ON projects(dept_id);
CREATE INDEX idx_proj_lead        ON projects(lead_person_id);
CREATE INDEX idx_task_employee    ON tasks(employee_id);
CREATE INDEX idx_task_project     ON tasks(project_id);
CREATE INDEX idx_task_sprint      ON tasks(sprint_id);
CREATE INDEX idx_task_dept        ON tasks(dept_id);
CREATE INDEX idx_task_stage       ON tasks(stage);
CREATE INDEX idx_subtask_task     ON sub_tasks(task_id);
CREATE INDEX idx_subtask_assigned ON sub_tasks(assigned_to);
CREATE INDEX idx_subtask_date     ON sub_tasks(task_date);
CREATE INDEX idx_subtask_status   ON sub_tasks(status);

-- =============================================================
-- SEED DATA
-- =============================================================

-- ──────────────────────────────────────
-- DEPARTMENTS
-- ──────────────────────────────────────
INSERT INTO departments (id, name, icon, work_mode) VALUES
  ('d1000000-0000-0000-0000-000000000001', 'Corporate Office',       '🏛️', 'Hybrid'),
  ('d1000000-0000-0000-0000-000000000002', 'Design & Development',   '🎨', 'Remote'),
  ('d1000000-0000-0000-0000-000000000003', 'Production',             '⚙️', 'On-site'),
  ('d1000000-0000-0000-0000-000000000004', 'Marketing',              '📣', 'Hybrid'),
  ('d1000000-0000-0000-0000-000000000005', 'Sales',                  '📈', 'Hybrid');

-- ──────────────────────────────────────
-- TEAM MEMBERS  (insert without sub_dept_id first)
-- ──────────────────────────────────────
INSERT INTO team_members (id, dept_id, reports_to_id, name, role, work_mode, hourly_rate, hours_logged) VALUES
  ('m1000000-0000-0000-0000-000000000001', 'd1000000-0000-0000-0000-000000000001', NULL,                                   'Priya Nair',   'Director',  'On-site', 120, 40),
  ('m1000000-0000-0000-0000-000000000002', 'd1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000001', 'Meera Pillai', 'Manager',   'Hybrid',  95,  38),
  ('m1000000-0000-0000-0000-000000000003', 'd1000000-0000-0000-0000-000000000005', 'm1000000-0000-0000-0000-000000000001', 'Karthik Iyer', 'Manager',   'Hybrid',  90,  36),
  ('m1000000-0000-0000-0000-000000000004', 'd1000000-0000-0000-0000-000000000002', 'm1000000-0000-0000-0000-000000000002', 'Asha Rao',     'Team Lead', 'Remote',  85,  42),
  ('m1000000-0000-0000-0000-000000000005', 'd1000000-0000-0000-0000-000000000002', 'm1000000-0000-0000-0000-000000000004', 'Rahul Sen',    'Employee',  'Remote',  65,  40),
  ('m1000000-0000-0000-0000-000000000006', 'd1000000-0000-0000-0000-000000000004', 'm1000000-0000-0000-0000-000000000002', 'Neha Gupta',   'Employee',  'Remote',  60,  35),
  ('m1000000-0000-0000-0000-000000000007', 'd1000000-0000-0000-0000-000000000003', 'm1000000-0000-0000-0000-000000000003', 'Vivek Sharma', 'Team Lead', 'On-site', 75,  44);

-- ──────────────────────────────────────
-- SUB-DEPARTMENTS
-- ──────────────────────────────────────
INSERT INTO sub_departments (id, dept_id, lead_person_id, name, work_mode) VALUES
  ('s1000000-0000-0000-0000-000000000001', 'd1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000001', 'Executive',          'On-site'),
  ('s1000000-0000-0000-0000-000000000002', 'd1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000002', 'HR & People',        'Hybrid'),
  ('s1000000-0000-0000-0000-000000000003', 'd1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000003', 'Finance',            'Hybrid'),
  ('s1000000-0000-0000-0000-000000000004', 'd1000000-0000-0000-0000-000000000001', NULL,                                   'Legal',              'Remote'),
  ('s1000000-0000-0000-0000-000000000005', 'd1000000-0000-0000-0000-000000000002', 'm1000000-0000-0000-0000-000000000004', 'UI/UX Design',       'Remote'),
  ('s1000000-0000-0000-0000-000000000006', 'd1000000-0000-0000-0000-000000000002', 'm1000000-0000-0000-0000-000000000005', 'Frontend Dev',       'Remote'),
  ('s1000000-0000-0000-0000-000000000007', 'd1000000-0000-0000-0000-000000000002', NULL,                                   'Backend Dev',        'Remote'),
  ('s1000000-0000-0000-0000-000000000008', 'd1000000-0000-0000-0000-000000000002', NULL,                                   'QA & Testing',       'Hybrid'),
  ('s1000000-0000-0000-0000-000000000009', 'd1000000-0000-0000-0000-000000000003', 'm1000000-0000-0000-0000-000000000007', 'Manufacturing',      'On-site'),
  ('s1000000-0000-0000-0000-000000000010', 'd1000000-0000-0000-0000-000000000003', NULL,                                   'Logistics',          'On-site'),
  ('s1000000-0000-0000-0000-000000000011', 'd1000000-0000-0000-0000-000000000003', NULL,                                   'Quality Control',    'On-site'),
  ('s1000000-0000-0000-0000-000000000012', 'd1000000-0000-0000-0000-000000000004', 'm1000000-0000-0000-0000-000000000006', 'Digital Marketing',  'Remote'),
  ('s1000000-0000-0000-0000-000000000013', 'd1000000-0000-0000-0000-000000000004', NULL,                                   'Content & Brand',    'Hybrid'),
  ('s1000000-0000-0000-0000-000000000014', 'd1000000-0000-0000-0000-000000000004', NULL,                                   'PR & Comms',         'Hybrid'),
  ('s1000000-0000-0000-0000-000000000015', 'd1000000-0000-0000-0000-000000000005', 'm1000000-0000-0000-0000-000000000003', 'Inside Sales',       'Hybrid'),
  ('s1000000-0000-0000-0000-000000000016', 'd1000000-0000-0000-0000-000000000005', NULL,                                   'Enterprise',         'On-site'),
  ('s1000000-0000-0000-0000-000000000017', 'd1000000-0000-0000-0000-000000000005', NULL,                                   'Partnerships',       'Remote'),
  ('s1000000-0000-0000-0000-000000000018', 'd1000000-0000-0000-0000-000000000005', NULL,                                   'Customer Success',   'Remote');

-- Assign sub-departments back to team members
UPDATE team_members SET sub_dept_id = 's1000000-0000-0000-0000-000000000001' WHERE id = 'm1000000-0000-0000-0000-000000000001';
UPDATE team_members SET sub_dept_id = 's1000000-0000-0000-0000-000000000002' WHERE id = 'm1000000-0000-0000-0000-000000000002';
UPDATE team_members SET sub_dept_id = 's1000000-0000-0000-0000-000000000015' WHERE id = 'm1000000-0000-0000-0000-000000000003';
UPDATE team_members SET sub_dept_id = 's1000000-0000-0000-0000-000000000005' WHERE id = 'm1000000-0000-0000-0000-000000000004';
UPDATE team_members SET sub_dept_id = 's1000000-0000-0000-0000-000000000006' WHERE id = 'm1000000-0000-0000-0000-000000000005';
UPDATE team_members SET sub_dept_id = 's1000000-0000-0000-0000-000000000012' WHERE id = 'm1000000-0000-0000-0000-000000000006';
UPDATE team_members SET sub_dept_id = 's1000000-0000-0000-0000-000000000009' WHERE id = 'm1000000-0000-0000-0000-000000000007';

-- ──────────────────────────────────────
-- PROJECTS
-- ──────────────────────────────────────
INSERT INTO projects (id, dept_id, lead_person_id, name, work_mode, allocated_budget, spent_budget, due_date) VALUES
  ('p1000000-0000-0000-0000-000000000001', 'd1000000-0000-0000-0000-000000000002', 'm1000000-0000-0000-0000-000000000004', 'Website Redesign',      'Remote',   80000,  38000, '2026-07-10'),
  ('p1000000-0000-0000-0000-000000000002', 'd1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000002', 'Client Migration',      'Hybrid',  120000,  74000, '2026-07-20'),
  ('p1000000-0000-0000-0000-000000000003', 'd1000000-0000-0000-0000-000000000004', 'm1000000-0000-0000-0000-000000000006', 'Q3 Marketing Campaign', 'Remote',   45000,  12000, '2026-08-01'),
  ('p1000000-0000-0000-0000-000000000004', 'd1000000-0000-0000-0000-000000000003', 'm1000000-0000-0000-0000-000000000007', 'Product Launch',        'On-site', 200000,  88000, '2026-09-01');

-- ──────────────────────────────────────
-- SPRINTS
-- ──────────────────────────────────────
INSERT INTO sprints (id, name, goal, start_date, end_date, budget, budget_spent) VALUES
  ('sp100000-0000-0000-0000-000000000001', 'Sprint 12', 'Ship website redesign hero + nav. Close Q3 budget sign-off.',        '2026-06-15', '2026-06-28', 25000, 22000),
  ('sp100000-0000-0000-0000-000000000002', 'Sprint 13', 'Client migration blockers cleared. Brand guide v2 published.',       '2026-06-29', '2026-07-12', 28000,  6000);

-- ──────────────────────────────────────
-- TASKS
-- ──────────────────────────────────────
INSERT INTO tasks (id, employee_id, dept_id, sub_dept_id, project_id, sprint_id, name, stage, priority, work_mode, slot_start, slot_end, due_date) VALUES
  ('t1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000004', 'd1000000-0000-0000-0000-000000000002', 's1000000-0000-0000-0000-000000000005', 'p1000000-0000-0000-0000-000000000001', 'sp100000-0000-0000-0000-000000000001', 'Website redesign hero',    'In Progress', 'High',   'Remote',   '09:00', '13:00', '2026-07-10'),
  ('t1000000-0000-0000-0000-000000000002', 'm1000000-0000-0000-0000-000000000005', 'd1000000-0000-0000-0000-000000000002', 's1000000-0000-0000-0000-000000000006', 'p1000000-0000-0000-0000-000000000001', 'sp100000-0000-0000-0000-000000000002', 'Mobile app icon set',      'Not Started', 'Medium', 'Remote',   '14:00', '17:00', '2026-07-18'),
  ('t1000000-0000-0000-0000-000000000003', 'm1000000-0000-0000-0000-000000000003', 'd1000000-0000-0000-0000-000000000005', 's1000000-0000-0000-0000-000000000015', 'p1000000-0000-0000-0000-000000000002', 'sp100000-0000-0000-0000-000000000001', 'Q3 budget planning',       'In Review',   'High',   'Hybrid',   '09:00', '12:00', '2026-07-01'),
  ('t1000000-0000-0000-0000-000000000004', 'm1000000-0000-0000-0000-000000000002', 'd1000000-0000-0000-0000-000000000001', 's1000000-0000-0000-0000-000000000002', 'p1000000-0000-0000-0000-000000000002', 'sp100000-0000-0000-0000-000000000001', 'Team onboarding docs',     'Completed',   'Low',    'Hybrid',   '13:00', '15:00', '2026-06-10'),
  ('t1000000-0000-0000-0000-000000000005', 'm1000000-0000-0000-0000-000000000002', 'd1000000-0000-0000-0000-000000000001', 's1000000-0000-0000-0000-000000000002', 'p1000000-0000-0000-0000-000000000002', 'sp100000-0000-0000-0000-000000000002', 'Client migration setup',   'On Hold',     'High',   'Hybrid',   '10:00', '12:00', '2026-07-20'),
  ('t1000000-0000-0000-0000-000000000006', 'm1000000-0000-0000-0000-000000000004', 'd1000000-0000-0000-0000-000000000002', 's1000000-0000-0000-0000-000000000005', 'p1000000-0000-0000-0000-000000000001', 'sp100000-0000-0000-0000-000000000002', 'Brand style guide v2',     'In Progress', 'Medium', 'Remote',   '15:00', '17:30', '2026-07-05'),
  ('t1000000-0000-0000-0000-000000000007', 'm1000000-0000-0000-0000-000000000005', 'd1000000-0000-0000-0000-000000000002', 's1000000-0000-0000-0000-000000000008', 'p1000000-0000-0000-0000-000000000001', 'sp100000-0000-0000-0000-000000000001', 'Mobile app UI testing',    'In Progress', 'High',   'Remote',   '09:30', '13:00', '2026-06-30'),
  ('t1000000-0000-0000-0000-000000000008', 'm1000000-0000-0000-0000-000000000006', 'd1000000-0000-0000-0000-000000000004', 's1000000-0000-0000-0000-000000000012', 'p1000000-0000-0000-0000-000000000003', 'sp100000-0000-0000-0000-000000000002', 'Q3 campaign brief',        'In Progress', 'Medium', 'Remote',   '09:00', '11:00', '2026-07-08'),
  ('t1000000-0000-0000-0000-000000000009', 'm1000000-0000-0000-0000-000000000007', 'd1000000-0000-0000-0000-000000000003', 's1000000-0000-0000-0000-000000000009', 'p1000000-0000-0000-0000-000000000004', 'sp100000-0000-0000-0000-000000000002', 'Product launch deck',      'Not Started', 'High',   'On-site',  '10:00', '14:00', '2026-07-15'),
  ('t1000000-0000-0000-0000-000000000010', 'm1000000-0000-0000-0000-000000000001', 'd1000000-0000-0000-0000-000000000001', 's1000000-0000-0000-0000-000000000001', 'p1000000-0000-0000-0000-000000000002', 'sp100000-0000-0000-0000-000000000001', 'Quarterly roadmap review', 'In Progress', 'High',   'On-site',  '09:00', '11:00', '2026-07-08');

-- ──────────────────────────────────────
-- SUB-TASKS  (daily steps)
-- ──────────────────────────────────────
INSERT INTO sub_tasks (task_id, assigned_to, name, task_date, estimated_hours, actual_hours, status) VALUES
  -- Website redesign hero (t1)
  ('t1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000004', 'Research competitor hero sections',   '2026-06-23', 2,   2,   'Done'),
  ('t1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000004', 'Sketch 3 layout concepts',            '2026-06-24', 3,   3.5, 'Done'),
  ('t1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000004', 'Build Figma prototype',               '2026-06-25', 4,   4,   'Done'),
  ('t1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000002', 'Stakeholder review & feedback',       '2026-06-26', 1,   1,   'Done'),
  ('t1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000004', 'Incorporate feedback into prototype', '2026-06-27', 3,   0,   'In Progress'),
  ('t1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000005', 'Hand off to Frontend Dev',            '2026-06-30', 1,   0,   'To Do'),
  -- Mobile app UI testing (t7)
  ('t1000000-0000-0000-0000-000000000007', 'm1000000-0000-0000-0000-000000000005', 'Write test cases for login flow',     '2026-06-25', 2,   2,   'Done'),
  ('t1000000-0000-0000-0000-000000000007', 'm1000000-0000-0000-0000-000000000005', 'Run regression suite',                '2026-06-27', 3,   3,   'Done'),
  ('t1000000-0000-0000-0000-000000000007', 'm1000000-0000-0000-0000-000000000005', 'Log and triage bugs',                 '2026-06-28', 2,   1.5, 'In Progress'),
  ('t1000000-0000-0000-0000-000000000007', 'm1000000-0000-0000-0000-000000000005', 'Fix critical P1 bugs',                '2026-06-29', 4,   0,   'To Do'),
  ('t1000000-0000-0000-0000-000000000007', 'm1000000-0000-0000-0000-000000000005', 'Re-test after fixes',                 '2026-06-30', 2,   0,   'To Do'),
  -- Q3 budget planning (t3)
  ('t1000000-0000-0000-0000-000000000003', 'm1000000-0000-0000-0000-000000000003', 'Gather dept budget requests',         '2026-06-22', 2,   2,   'Done'),
  ('t1000000-0000-0000-0000-000000000003', 'm1000000-0000-0000-0000-000000000003', 'Model scenarios in spreadsheet',      '2026-06-24', 4,   4,   'Done'),
  ('t1000000-0000-0000-0000-000000000003', 'm1000000-0000-0000-0000-000000000003', 'Present draft to Director',           '2026-06-26', 1,   1,   'Done'),
  ('t1000000-0000-0000-0000-000000000003', 'm1000000-0000-0000-0000-000000000003', 'Incorporate Director feedback',       '2026-06-28', 2,   0,   'In Progress'),
  ('t1000000-0000-0000-0000-000000000003', 'm1000000-0000-0000-0000-000000000003', 'Submit final to Finance',             '2026-07-01', 1,   0,   'To Do'),
  -- Q3 campaign brief (t8)
  ('t1000000-0000-0000-0000-000000000008', 'm1000000-0000-0000-0000-000000000006', 'Define target audience segments',     '2026-06-28', 2,   0,   'In Progress'),
  ('t1000000-0000-0000-0000-000000000008', 'm1000000-0000-0000-0000-000000000006', 'Draft messaging framework',           '2026-06-29', 3,   0,   'To Do'),
  ('t1000000-0000-0000-0000-000000000008', 'm1000000-0000-0000-0000-000000000006', 'Channel strategy & budget split',     '2026-06-30', 2,   0,   'To Do'),
  ('t1000000-0000-0000-0000-000000000008', 'm1000000-0000-0000-0000-000000000002', 'Review with Manager',                 '2026-07-01', 1,   0,   'To Do');

-- =============================================================
-- VIEWS
-- =============================================================

-- Task progress % (mirrors dashboard SP map)
CREATE VIEW v_task_progress AS
SELECT
    t.id, t.name, t.stage, t.priority, t.due_date,
    m.name  AS employee,
    d.name  AS department,
    sd.name AS sub_department,
    p.name  AS project,
    sp.name AS sprint,
    CASE t.stage
        WHEN 'Not Started' THEN 0
        WHEN 'In Progress' THEN 50
        WHEN 'In Review'   THEN 80
        WHEN 'Completed'   THEN 100
        WHEN 'On Hold'     THEN 25
        ELSE 0
    END AS progress_pct,
    CASE
        WHEN t.stage = 'Completed'     THEN 'Done'
        WHEN t.due_date < CURRENT_DATE THEN 'Overdue'
        WHEN t.due_date <= CURRENT_DATE + 3 THEN 'Due Soon'
        ELSE 'On Track'
    END AS status
FROM tasks t
LEFT JOIN team_members  m  ON t.employee_id  = m.id
LEFT JOIN departments   d  ON t.dept_id      = d.id
LEFT JOIN sub_departments sd ON t.sub_dept_id = sd.id
LEFT JOIN projects      p  ON t.project_id   = p.id
LEFT JOIN sprints       sp ON t.sprint_id    = sp.id;

-- Project budget summary
CREATE VIEW v_project_budget AS
SELECT
    p.id, p.name, p.work_mode, p.due_date,
    d.name  AS department,
    m.name  AS lead,
    p.allocated_budget,
    p.spent_budget,
    p.allocated_budget - p.spent_budget          AS remaining_budget,
    ROUND(p.spent_budget / NULLIF(p.allocated_budget,0) * 100, 1) AS pct_used,
    COUNT(t.id)                                  AS task_count,
    ROUND(AVG(CASE t.stage
        WHEN 'Not Started' THEN 0  WHEN 'In Progress' THEN 50
        WHEN 'In Review'   THEN 80 WHEN 'Completed'   THEN 100
        WHEN 'On Hold'     THEN 25 ELSE 0 END), 1) AS avg_task_progress
FROM projects p
LEFT JOIN departments  d ON p.dept_id        = d.id
LEFT JOIN team_members m ON p.lead_person_id = m.id
LEFT JOIN tasks        t ON t.project_id     = p.id
GROUP BY p.id, p.name, p.work_mode, p.due_date, d.name, m.name,
         p.allocated_budget, p.spent_budget;

-- Sprint burndown
CREATE VIEW v_sprint_burndown AS
SELECT
    sp.id, sp.name, sp.goal, sp.start_date, sp.end_date,
    sp.budget, sp.budget_spent,
    sp.budget - sp.budget_spent AS budget_remaining,
    COUNT(t.id)   AS total_tasks,
    COUNT(t.id) FILTER (WHERE t.stage = 'Completed') AS completed_tasks,
    ROUND(100.0 * COUNT(t.id) FILTER (WHERE t.stage='Completed')
          / NULLIF(COUNT(t.id),0), 1) AS completion_pct,
    CURRENT_DATE - sp.start_date AS days_elapsed,
    sp.end_date - CURRENT_DATE   AS days_remaining
FROM sprints sp
LEFT JOIN tasks t ON t.sprint_id = sp.id
GROUP BY sp.id, sp.name, sp.goal, sp.start_date, sp.end_date,
         sp.budget, sp.budget_spent;

-- Employee workload & cost
CREATE VIEW v_employee_workload AS
SELECT
    m.id, m.name, m.role, m.work_mode,
    d.name  AS department,
    sd.name AS sub_department,
    r.name  AS reports_to,
    m.hourly_rate, m.hours_logged,
    m.hourly_rate * m.hours_logged AS total_cost,
    COUNT(t.id) FILTER (WHERE t.stage <> 'Completed') AS active_tasks,
    COUNT(t.id) FILTER (WHERE t.stage =  'Completed') AS completed_tasks,
    ROUND(AVG(CASE t.stage
        WHEN 'Not Started' THEN 0  WHEN 'In Progress' THEN 50
        WHEN 'In Review'   THEN 80 WHEN 'Completed'   THEN 100
        WHEN 'On Hold'     THEN 25 ELSE 0 END), 1) AS avg_progress
FROM team_members m
LEFT JOIN departments   d  ON m.dept_id      = d.id
LEFT JOIN sub_departments sd ON m.sub_dept_id = sd.id
LEFT JOIN team_members  r  ON m.reports_to_id = r.id
LEFT JOIN tasks         t  ON t.employee_id   = m.id
GROUP BY m.id, m.name, m.role, m.work_mode, d.name, sd.name, r.name,
         m.hourly_rate, m.hours_logged;

-- Department summary (rolls up from tasks)
CREATE VIEW v_department_summary AS
SELECT
    d.id, d.name, d.icon, d.work_mode,
    COUNT(DISTINCT m.id)    AS headcount,
    COUNT(DISTINCT p.id)    AS project_count,
    COUNT(DISTINCT t.id)    AS task_count,
    ROUND(AVG(CASE t.stage
        WHEN 'Not Started' THEN 0  WHEN 'In Progress' THEN 50
        WHEN 'In Review'   THEN 80 WHEN 'Completed'   THEN 100
        WHEN 'On Hold'     THEN 25 ELSE 0 END), 1) AS avg_progress,
    SUM(p.allocated_budget) AS total_allocated,
    SUM(p.spent_budget)     AS total_spent
FROM departments d
LEFT JOIN team_members m ON m.dept_id    = d.id
LEFT JOIN projects     p ON p.dept_id    = d.id
LEFT JOIN tasks        t ON t.dept_id    = d.id
GROUP BY d.id, d.name, d.icon, d.work_mode;

-- Sub-task hours summary per parent task
CREATE VIEW v_subtask_hours AS
SELECT
    t.id AS task_id, t.name AS task_name,
    COUNT(st.id)                     AS subtask_count,
    COUNT(st.id) FILTER (WHERE st.status = 'Done')        AS done_count,
    COUNT(st.id) FILTER (WHERE st.status = 'In Progress') AS active_count,
    COUNT(st.id) FILTER (WHERE st.status = 'Blocked')     AS blocked_count,
    SUM(st.estimated_hours)          AS total_estimated_hrs,
    SUM(st.actual_hours)             AS total_actual_hrs,
    SUM(st.actual_hours) - SUM(st.estimated_hours) AS variance_hrs,
    ROUND(100.0 * COUNT(st.id) FILTER (WHERE st.status='Done')
          / NULLIF(COUNT(st.id),0), 1) AS completion_pct
FROM tasks t
LEFT JOIN sub_tasks st ON st.task_id = t.id
GROUP BY t.id, t.name;

-- =============================================================
-- USEFUL QUERIES
-- =============================================================

-- 1. All tasks with full context
-- SELECT * FROM v_task_progress ORDER BY due_date;

-- 2. Overdue tasks
-- SELECT name, employee, project, due_date FROM v_task_progress WHERE status = 'Overdue';

-- 3. Budget health across projects
-- SELECT name, pct_used, remaining_budget, avg_task_progress FROM v_project_budget ORDER BY pct_used DESC;

-- 4. Active sprint burndown
-- SELECT name, total_tasks, completed_tasks, completion_pct, days_remaining, budget_remaining FROM v_sprint_burndown;

-- 5. Employee cost summary
-- SELECT name, role, department, hourly_rate, hours_logged, total_cost, active_tasks FROM v_employee_workload ORDER BY total_cost DESC;

-- 6. Department health dashboard
-- SELECT name, headcount, task_count, avg_progress, total_allocated, total_spent FROM v_department_summary;

-- 7. Sub-task hours variance (who is over-running?)
-- SELECT task_name, done_count, subtask_count, total_estimated_hrs, total_actual_hrs, variance_hrs FROM v_subtask_hours WHERE variance_hrs > 0 ORDER BY variance_hrs DESC;
