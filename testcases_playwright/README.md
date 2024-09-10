# Viewing test traces

step 1: go to All completed test traces\test2_UserForm-Checking-up-0202a-nder-admin---Get-User-Data--chromium\trace.zip 

step 2: download the .zip file

step 3: open browser and go to trace.playwright.dev

step 4: drop the zip file here to view the trace

# Running tests
{NOTE: RUN Test1 first at all times. Other three tests you can run in any order}

step 1: Run both front end and backend with table = "create" under application.properties in springboot

step 2: open terminal and enter 

>> cd EZP_Frontend\testcases_playwright 

>> npm init playwright@latest   

enter for javascript for above
and don't override anything if asked

step 3: run command present in each test file under tests folder