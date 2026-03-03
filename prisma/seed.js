"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var jobs, _i, jobs_1, j, job;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Clear existing
                return [4 /*yield*/, prisma.application.deleteMany()];
                case 1:
                    // Clear existing
                    _a.sent();
                    return [4 /*yield*/, prisma.job.deleteMany()];
                case 2:
                    _a.sent();
                    jobs = [
                        {
                            title: 'Email Marketing',
                            company: 'Revolut',
                            location: 'Madrid, Spain',
                            category: 'Marketing',
                            type: 'Full Time',
                            description: 'Revolut is looking for Email Marketing to help team design ... \n\nWe are looking for an experienced email marketing manager to guide our automation processes and ensure high engagement.',
                            salary: '$50k - $70k',
                        },
                        {
                            title: 'Brand Designer',
                            company: 'Dropbox',
                            location: 'San Francisco, US',
                            category: 'Design',
                            type: 'Full Time',
                            description: 'Dropbox is looking for Brand Designer to help the team... \n\nJoin our design team to craft beautiful and intuitive experiences for millions of users.',
                            salary: '$90k - $120k',
                        },
                        {
                            title: 'Visual Designer',
                            company: 'Blinklist',
                            location: 'Granada, Spain',
                            category: 'Design',
                            type: 'Full Time',
                            description: 'Blinklist is looking for Visual Designer to help team design ... \n\nWork on engaging visual concepts and brand identity systems.',
                            salary: '$60k - $85k',
                        },
                        {
                            title: 'Product Designer',
                            company: 'ClassPass',
                            location: 'Manchester, UK',
                            category: 'Design',
                            type: 'Full Time',
                            description: 'ClassPass is looking for Product Designer to help us build... \n\nWe need a talented designer to create user flows, prototypes, and high-fidelity mockups.',
                            salary: '£55k - £75k',
                        },
                        {
                            title: 'Interactive Developer',
                            company: 'Terraform',
                            location: 'Hamburg, Germany',
                            category: 'Engineering',
                            type: 'Full Time',
                            description: 'Terraform is looking for Interactive Developer to help team... \n\nDevelop cutting-edge web experiences using Next.js, WebGL, and modern tools.',
                            salary: '€65k - €90k',
                        },
                        {
                            title: 'HR Manager',
                            company: 'Packer',
                            location: 'Lucern, Switzerland',
                            category: 'Human Resource',
                            type: 'Full Time',
                            description: 'Packer is looking for HR Manager to help team manage ... \n\nDrive recruitment, employee relations, and HR strategy in a fast-paced environment.',
                            salary: 'CHF 80k - CHF 110k',
                        },
                        {
                            title: 'Social Media Assistant',
                            company: 'Nomad',
                            location: 'Paris, France',
                            category: 'Marketing',
                            type: 'Part Time',
                            description: 'Nomad is looking for Social Media Assistant ... \n\nManage community engagement and content posting across Instagram and TikTok.',
                            salary: '€20/hr',
                        },
                        {
                            title: 'Data Analyst',
                            company: 'Twitter',
                            location: 'San Diego, US',
                            category: 'Technology',
                            type: 'Full Time',
                            description: 'Twitter is looking for Data Analyst to help team ... \n\nAnalyze massive datasets to uncover trends and drive business decisions.',
                            salary: '$110k - $140k',
                        }
                    ];
                    console.log("Start seeding ...");
                    _i = 0, jobs_1 = jobs;
                    _a.label = 3;
                case 3:
                    if (!(_i < jobs_1.length)) return [3 /*break*/, 6];
                    j = jobs_1[_i];
                    return [4 /*yield*/, prisma.job.create({
                            data: j,
                        })];
                case 4:
                    job = _a.sent();
                    console.log("Created job with id: ".concat(job.id));
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    console.log("Seeding finished.");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
